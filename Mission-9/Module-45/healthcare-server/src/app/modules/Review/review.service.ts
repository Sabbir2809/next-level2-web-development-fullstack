import { Prisma, Review } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { TPaginationOptions } from "../../types/pagination";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";

const createReviewIntoDB = async (user: JwtPayload, payload: Partial<Review>) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });

  if (!(patientData.id === appointmentData.patientId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your Appointment");
  }

  const result = await prisma.$transaction(async (tsc) => {
    const result = await tsc.review.create({
      data: {
        appointmentId: appointmentData.id,
        doctorId: appointmentData.doctorId,
        patientId: appointmentData.patientId,
        rating: payload.rating as number,
        comment: payload.comment as string,
      },
    });

    const averageRating = await tsc.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    await tsc.doctor.update({
      where: {
        id: result.doctorId,
      },
      data: {
        averageRating: averageRating._avg.rating as number,
      },
    });
    return result;
  });

  return result;
};

const getAllReviewsFromDB = async (filters: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { patientEmail, doctorEmail } = filters;
  const andConditions: Prisma.ReviewWhereInput[] = [];

  if (patientEmail) {
    andConditions.push({
      patient: {
        email: patientEmail,
      },
    });
  }

  if (doctorEmail) {
    andConditions.push({
      doctor: {
        email: doctorEmail,
      },
    });
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    include: {
      doctor: true,
      patient: true,
    },
  });
  const total = await prisma.review.count({
    where: whereConditions,
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

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
