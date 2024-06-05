import { AppointmentStatus, PaymentStatus, Prisma, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { generateTransactionId } from "../Payment/payment.utlis";

const createAppointmentIntoDB = async (user: JwtPayload, payload: any) => {
  const { doctorId, scheduleId } = payload;

  // doctor
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: doctorId,
      isDeleted: false,
    },
  });

  // patient
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
      isDeleted: false,
    },
  });

  // doctorSchedule
  const doctorScheduleData = await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorId,
      scheduleId: scheduleId,
      isBooked: false,
    },
  });

  // Check if an appointment already exists with the same scheduleId
  const existingAppointment = await prisma.appointment.findUnique({
    where: {
      scheduleId: scheduleId,
    },
  });

  if (existingAppointment) {
    throw new Error("An appointment already exists for the provided scheduleId");
  }

  // generate video calling id
  const videoCallingId: string = uuidv4();

  // transaction
  return await prisma.$transaction(async (transactionClient) => {
    const result = await transactionClient.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: doctorScheduleData.scheduleId,
        videoCallingId,
      },
      include: {
        doctor: true,
        schedule: true,
      },
    });

    await transactionClient.doctorSchedules.updateMany({
      where: {
        doctorId: doctorData.id,
        scheduleId: doctorScheduleData.scheduleId,
      },
      data: {
        isBooked: true,
        appointmentId: result.id,
      },
    });

    const transactionId: string = generateTransactionId(result.id);

    await transactionClient.payment.create({
      data: {
        appointmentId: result.id,
        amount: result.doctor.appointmentFee,
        transactionId,
      },
    });

    return result;
  });
};

const getMyAppointmentFromDB = async (
  user: JwtPayload,
  filters: any,
  options: TPaginationOptions
) => {
  const { ...filterData } = filters;
  const { page, limit, skip } = calculatePagination(options);
  const andConditions: Prisma.AppointmentWhereInput[] = [];

  if (user?.role === UserRole.PATIENT) {
    andConditions.push({
      patient: {
        email: user.email,
      },
    });
  } else if (user?.role === UserRole.DOCTOR) {
    andConditions.push({
      doctor: {
        email: user.email,
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

  const whereConditions: Prisma.AppointmentWhereInput = { AND: andConditions };
  const result = await prisma.appointment.findMany({
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
    include:
      user.role === UserRole.PATIENT
        ? { doctor: true, schedule: true, patient: true }
        : {
            patient: {
              include: {
                patientHealthData: true,
                medicalReport: true,
              },
            },
            schedule: true,
          },
  });

  const total = await prisma.appointment.count({
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

const getAllAppointmentsFromDB = async (
  user: JwtPayload,
  filters: any,
  options: TPaginationOptions
) => {
  const { patientEmail, doctorEmail, ...filterData } = filters;
  const { page, limit, skip } = calculatePagination(options);
  const andConditions: Prisma.AppointmentWhereInput[] = [];

  if (patientEmail) {
    andConditions.push({
      patient: {
        email: patientEmail,
      },
    });
  } else if (doctorEmail) {
    andConditions.push({
      doctor: {
        email: doctorEmail,
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

  const whereConditions: Prisma.AppointmentWhereInput = { AND: andConditions };
  const result = await prisma.appointment.findMany({
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
      doctor: true,
      patient: true,
    },
  });

  const total = await prisma.appointment.count({
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

const changeAppointmentStatusIntoDB = async (
  appointmentId: string,
  status: AppointmentStatus,
  user: JwtPayload
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: appointmentId,
    },
    include: {
      doctor: true,
    },
  });

  if (user.role === UserRole.DOCTOR) {
    if (!(user.email === appointmentData.doctor.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "This is not your Appointment");
    }
  }

  const result = await prisma.appointment.update({
    where: {
      id: appointmentData.id,
    },
    data: {
      status,
    },
  });
  return result;
};

const cancelUnpaidAppointments = async () => {
  const thirtyMinuteAge = new Date(Date.now() - 30 * 60 * 1000);

  const unPaidAppointments = await prisma.appointment.findMany({
    where: {
      createdAt: {
        lte: thirtyMinuteAge,
      },
      paymentStatus: PaymentStatus.UNPAID,
    },
  });

  const appointmentIdsToCancel = unPaidAppointments.map((appointment) => appointment.id);

  await prisma.$transaction(async (tsc) => {
    await tsc.payment.deleteMany({
      where: {
        appointmentId: {
          in: appointmentIdsToCancel,
        },
      },
    });

    for (const unPaidAppointment of unPaidAppointments) {
      await tsc.doctorSchedules.updateMany({
        where: {
          doctorId: unPaidAppointment.doctorId,
          scheduleId: unPaidAppointment.scheduleId,
        },
        data: {
          isBooked: false,
        },
      });
    }
  });
};

export const AppointmentServices = {
  createAppointmentIntoDB,
  getMyAppointmentFromDB,
  getAllAppointmentsFromDB,
  changeAppointmentStatusIntoDB,
  cancelUnpaidAppointments,
};
