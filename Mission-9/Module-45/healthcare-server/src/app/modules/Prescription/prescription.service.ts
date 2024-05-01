import { AppointmentStatus, PaymentStatus, Prescription } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";

const createPrescriptionIntoDB = async (user: JwtPayload, payload: Partial<Prescription>) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });

  if (!(user.email === appointmentData.doctor.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your Appointment");
  }

  const result = await prisma.prescription.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
      instructions: payload.instructions as string,
      followUpDate: payload.followUpDate || null,
    },
    include: {
      patient: true,
    },
  });
  return result;
};

const getPatientPrescriptionFormDB = async (user: JwtPayload, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);

  const result = await prisma.prescription.findMany({
    where: {
      patient: {
        email: user?.email,
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
    include: {
      doctor: true,
      patient: true,
      appointment: true,
    },
  });

  const total = await prisma.prescription.count({
    where: {
      patient: {
        email: user?.email,
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

export const PrescriptionServices = {
  createPrescriptionIntoDB,
  getPatientPrescriptionFormDB,
};
