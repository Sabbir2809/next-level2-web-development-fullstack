import { Prisma, Schedule } from "@prisma/client";
import { addHours, addMinutes, format } from "date-fns";
import { JwtPayload } from "jsonwebtoken";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { IFilterRequest, ISchedule } from "./schedule.interface";

const convertDateTime = async (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

const createScheduleIntoDB = async (payload: ISchedule): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate); // start date
  const lastDate = new Date(endDate); // end date

  while (currentDate <= lastDate) {
    // 09:30 -> ['09','30']
    const startDateTime = new Date(
      addMinutes(
        addHours(`${format(currentDate, "yyyy-MM-dd")}`, Number(startTime.split(":")[0])),
        Number(startTime.split(":")[1])
      )
    ); // add time
    const endDateTime = new Date(
      addMinutes(
        addHours(`${format(currentDate, "yyyy-MM-dd")}`, Number(endTime.split(":")[0])),
        Number(endTime.split(":")[1])
      )
    ); // add time

    while (startDateTime < endDateTime) {
      // Local
      // const scheduleData = {
      //   startDateTime,
      //   endDateTime: addMinutes(startDateTime, intervalTime),
      // };

      const s = await convertDateTime(startDateTime);
      const e = await convertDateTime(addMinutes(startDateTime, intervalTime));

      // UTC
      const scheduleData = {
        startDate: s,
        endDate: e,
      };

      // existingSchedule
      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          ...scheduleData,
        },
      });

      if (!existingSchedule) {
        // create
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
};

const getAllSchedulesFormDB = async (
  params: IFilterRequest,
  options: TPaginationOptions,
  user: JwtPayload
) => {
  const { page, limit, skip } = calculatePagination(options);
  const { startDate, endDate, ...filterData } = params;
  const andConditions = [];

  // Adding date filtering conditions if startDate and endDate are provided
  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          startDate: {
            gte: startDate, // Greater than or equal to startDate
          },
        },
        {
          endDate: {
            lte: endDate, // Less than or equal to endDate
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const doctorsSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
  });

  const doctorScheduleIds = new Set(doctorsSchedules.map((schedule) => schedule.scheduleId));

  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,
      id: {
        notIn: [...doctorScheduleIds],
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.schedule.count({
    where: {
      ...whereConditions,
      id: {
        notIn: [...doctorScheduleIds],
      },
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getScheduleByIdFromDB = async (id: string): Promise<Schedule | null> => {
  const result = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteScheduleIntoDB = async (id: string): Promise<Schedule> => {
  const result = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ScheduleServices = {
  createScheduleIntoDB,
  getAllSchedulesFormDB,
  getScheduleByIdFromDB,
  deleteScheduleIntoDB,
};
