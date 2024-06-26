import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const initPayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.initPayment(req.params.appointmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment Initiate Successfully",
    data: result,
  });
});

const validatePayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.validatePayment(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment Validate Successfully",
    data: result,
  });
});

export const PaymentControllers = {
  initPayment,
  validatePayment,
};
