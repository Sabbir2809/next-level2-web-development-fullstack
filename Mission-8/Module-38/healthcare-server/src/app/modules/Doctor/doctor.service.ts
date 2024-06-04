import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { doctorSearchAbleFields } from "./doctor.constant";
import { IDoctorFilterRequest } from "./doctor.interface";

const getAllFromDB = async (params: IDoctorFilterRequest, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, specialties, ...filterData } = params;
  const andConditions: Prisma.DoctorWhereInput[] = [];

  // only searchTerm
  if (params.searchTerm) {
    andConditions.push({
      OR: doctorSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // doctor > doctorSpecialties > specialties -> title
  if (specialties && specialties.length > 0) {
    andConditions.push({
      doctorSpecialties: {
        some: {
          specialties: {
            title: {
              contains: specialties,
              mode: "insensitive",
            },
          },
        },
      },
    });
  }

  // specific field
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // hide delete data
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput = { AND: andConditions };
  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            averageRating: "desc",
          },
    include: {
      review: {
        select: {
          rating: true,
        },
      },
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getIdFromDB = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      doctorSpecialties: {
        select: {
          specialties: {
            select: {
              id: true,
              icon: true,
              title: true,
            },
          },
        },
      },
      doctorSchedules: true,
      review: true,
    },
  });
  return result;
};

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (transactionClient) => {
    await transactionClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
    });

    if (specialties && specialties.length > 0) {
      // delete specialties
      const deleteSpecialtiesIds = specialties.filter((specialty: any) => specialty.isDeleted);
      for (const specialty of deleteSpecialtiesIds) {
        await transactionClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }

      // create specialties
      const createSpecialtiesIds = specialties.filter((specialty: any) => !specialty.isDeleted);
      for (const specialty of createSpecialtiesIds) {
        await transactionClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });
  return result;
};

const permanentDeleteFromDB = async (id: string): Promise<Doctor | null> => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const doctorDeletedData = await transactionClient.doctor.delete({
      where: { id },
    });

    await transactionClient.user.delete({
      where: {
        email: doctorDeletedData.email,
      },
    });
    return doctorDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string): Promise<Doctor | null> => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  // transaction and roll back
  const result = await prisma.$transaction(async (transactionClient) => {
    // update-1
    const doctorDeletedData = await transactionClient.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    // update-2
    await transactionClient.user.update({
      where: {
        email: doctorDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return doctorDeletedData;
  });

  return result;
};

export const DoctorServices = {
  getAllFromDB,
  getIdFromDB,
  updateIntoDB,
  permanentDeleteFromDB,
  softDeleteFromDB,
};
