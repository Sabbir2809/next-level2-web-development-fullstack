import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AppointmentServices } from "./appointment.service";

const createAppointment = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const result = await AppointmentServices.createAppointmentIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment booked Successfully",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
};
