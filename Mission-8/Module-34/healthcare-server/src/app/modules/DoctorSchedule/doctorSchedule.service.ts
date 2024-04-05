import { Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
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

const getDoctorSchedulesFormDB = async (
  params: any,
  options: TPaginationOptions,
  user: JwtPayload
) => {
  const { page, limit, skip } = calculatePagination(options);
  const { startDate, endDate, ...filterData } = params;
  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDateTime: {
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

export const DoctorScheduleServices = {
  createDoctorScheduleIntoDB,
  getDoctorSchedulesFormDB,
};
