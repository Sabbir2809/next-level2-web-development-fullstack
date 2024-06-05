import { PaymentStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import prisma from "../../utils/prisma";
import { SSLCommerzServices } from "../SSLCommerz/SSLCommerz.service";

const initPayment = async (appointmentId: string) => {
  try {
    const paymentData = await prisma.payment.findFirstOrThrow({
      where: {
        appointmentId,
      },
      include: {
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (paymentData.status === PaymentStatus.PAID) {
      throw new ApiError(httpStatus.BAD_REQUEST, "You already pay for the appointment!");
    }

    const initPaymentData = {
      amount: paymentData.amount,
      transactionId: paymentData.transactionId,
      name: paymentData.appointment.patient.name,
      email: paymentData.appointment.patient.email,
      address: paymentData.appointment.patient.address,
      phoneNumber: paymentData.appointment.patient.contactNumber,
    };

    const result = await SSLCommerzServices.initPayment(initPaymentData);
    return {
      paymentUrl: result.GatewayPageURL,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Error!");
  }
};

const validatePayment = async (payload: any) => {
  // :::::production(deploy):::::
  // if (!payload || !payload.status || !(payload.status === "VALID")) {
  //   return {
  //     message: "Invalid Payment!",
  //   };
  // }
  // const response = await SSLCommerzServices.validatePayment(payload);

  // if (response.status !== "VALID") {
  //   return {
  //     message: "Payment Failed!",
  //   };
  // }

  // :::::development(locally):::::
  const { tran_id } = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: tran_id,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });
  return {
    message: "Payment Success!",
  };
};

export const PaymentServices = {
  initPayment,
  validatePayment,
};
