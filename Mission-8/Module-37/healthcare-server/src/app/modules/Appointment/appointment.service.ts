import { AppointmentStatus, PaymentStatus, Prisma, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";

const createAppointmentIntoDB = async (user: JwtPayload, payload: any) => {
  // patient
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  // doctor
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
      isDeleted: false,
    },
  });

  // doctorSchedule
  const doctorScheduleData = await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  // generate video calling id
  const videoCallingId: string = await uuidv4();

  // transaction
  const result = await prisma.$transaction(async (tc) => {
    // create appointment
    const appointmentData = await tc.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: doctorScheduleData.scheduleId,
        videoCallingId,
      },
      include: {
        doctor: true,
        schedule: true,
        patient: true,
      },
    });

    // update schedules
    await tc.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: doctorScheduleData.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    // Healthcare-DateTime-
    const today = new Date();
    const transactionId = `Healthcare-${today.getFullYear()}${today.getMonth()}${today.getDay()}${today.getHours()}`;

    await tc.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });

  return result;
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
        ? { doctor: true, schedule: true }
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
      tsc.doctorSchedules.updateMany({
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

  console.log("Updated");
};

export const AppointmentServices = {
  createAppointmentIntoDB,
  getMyAppointmentFromDB,
  getAllAppointmentsFromDB,
  changeAppointmentStatusIntoDB,
  cancelUnpaidAppointments,
};
