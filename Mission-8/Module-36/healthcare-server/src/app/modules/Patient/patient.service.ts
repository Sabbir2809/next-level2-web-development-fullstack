import { Patient, Prisma, UserStatus } from "@prisma/client";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { patientSearchAbleFields } from "./patient.constant";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";

const getAllFromDB = async (params: IPatientFilterRequest, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.PatientWhereInput[] = [];

  // only searchTerm
  if (params.searchTerm) {
    andConditions.push({
      OR: patientSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
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

  const whereConditions: Prisma.PatientWhereInput = { AND: andConditions };
  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });

  const total = await prisma.patient.count({
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

const getIdFromDB = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<IPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;

  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  await prisma.$transaction(async (transactionClient) => {
    // update patient data
    await transactionClient.patient.update({
      where: {
        id: patientInfo.id,
      },
      data: patientData,
      include: {
        patientHealthData: true,
        medicalReport: true,
      },
    });

    // create or update patient health data
    if (patientHealthData) {
      await transactionClient.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: patientHealthData,
        create: {
          ...patientHealthData,
          patientId: patientInfo.id,
        },
      });
    }
    if (medicalReport) {
      await transactionClient.medicalReport.create({
        data: {
          ...medicalReport,
          patientId: patientInfo.id,
        },
      });
    }
  });

  const result = await prisma.patient.findUnique({
    where: {
      id: patientInfo.id,
    },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });
  return result;
};

const permanentDeleteInto = async (id: string): Promise<Patient | null> => {
  const result = await prisma.$transaction(async (tc) => {
    // delete medical report
    await tc.medicalReport.deleteMany({
      where: {
        patientId: id,
      },
    });
    // delete patient health data
    await tc.patientHealthData.delete({
      where: {
        patientId: id,
      },
    });

    // delete patient data
    const deletedPatient = await tc.patient.delete({
      where: {
        id,
      },
    });

    await tc.user.delete({
      where: {
        email: deletedPatient.email,
      },
    });

    return deletedPatient;
  });
  return result;
};

const softDeleteIntoDB = async (id: string): Promise<Patient | null> => {
  await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  // transaction and roll back
  const result = await prisma.$transaction(async (transactionClient) => {
    // update-1
    const patientDeletedData = await transactionClient.patient.update({
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
        email: patientDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return patientDeletedData;
  });

  return result;
};

export const PatientServices = {
  getAllFromDB,
  getIdFromDB,
  updateIntoDB,
  permanentDeleteInto,
  softDeleteIntoDB,
};
