import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";

const createDoctorScheduleIntoDB = async (user: JwtPayload, payload: { scheduleIds: string[] }) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId: string) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
  return result;
};

const getAllDoctorSchedulesFormDB = async (filters: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, startDate, endDate, ...filterData } = filters;
  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  // only searchTerm
  if (searchTerm) {
    andConditions.push({
      doctor: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
    });
  }

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDate: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDate: {
              lte: endDate,
            },
          },
        },
      ],
    });
  }

  // specific field
  if (Object.keys(filterData).length > 0) {
    if (typeof filterData.isBooked === "string" && filterData.isBooked === "true") {
      filterData.isBooked = true;
    } else if (typeof filterData.isBooked === "string" && filterData.isBooked === "false") {
      filterData.isBooked = false;
    }
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.DoctorSchedulesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
    include: {
      doctor: true,
      schedule: true,
    },
  });

  const total = await prisma.doctorSchedules.count({
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

const getMySchedulesFormDB = async (
  filters: any,
  options: TPaginationOptions,
  user: JwtPayload
) => {
  const { page, limit, skip } = calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;
  const whereConditions: Prisma.DoctorSchedulesWhereInput = {
    doctor: {
      email: user.email,
    },
    ...(startDate && endDate
      ? {
          schedule: {
            startDate: {
              gte: new Date(startDate),
            },
            endDate: {
              lte: new Date(endDate),
            },
          },
        }
      : {}),
    ...(Object.keys(filterData).length > 0
      ? {
          AND: Object.keys(filterData).map((key) => ({
            [key]: {
              equals: (filterData as any)[key],
            },
          })),
        }
      : {}),
  };

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    include: {
      doctor: true,
      schedule: true,
      appointment: true,
    },
    skip,
    take: limit,
  });

  return {
    meta: {
      total: doctorSchedules.length,
      page,
      limit,
    },
    data: doctorSchedules,
  };
};

const deleteMyScheduleIntoDB = async (scheduleId: string, user: JwtPayload) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  const isBookedSchedule = await prisma.doctorSchedules.findFirst({
    where: {
      doctorId: doctorData.id,
      scheduleId,
      isBooked: true,
    },
  });

  if (isBookedSchedule) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You can not delete of schedule because of the schedule is Already Booked!"
    );
  }

  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorData.id,
        scheduleId,
      },
    },
  });

  return result;
};

export const DoctorScheduleServices = {
  createDoctorScheduleIntoDB,
  getMySchedulesFormDB,
  deleteMyScheduleIntoDB,
  getAllDoctorSchedulesFormDB,
};
