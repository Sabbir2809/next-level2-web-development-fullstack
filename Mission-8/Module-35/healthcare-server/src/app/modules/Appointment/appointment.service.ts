import { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
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

export const AppointmentServices = {
  createAppointmentIntoDB,
};
