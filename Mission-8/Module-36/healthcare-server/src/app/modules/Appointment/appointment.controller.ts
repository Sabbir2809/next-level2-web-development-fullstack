import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { appointmentFilterableFields } from "./appointment.constant";
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

const getMyAppointment = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const filters = pick(req.query, ["status", "paymentStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AppointmentServices.getMyAppointmentFromDB(user, filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get My Appointment Fetched Successfully",
    data: result,
  });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AppointmentServices.getAllAppointmentsFromDB(user, filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All Appointments Fetched Successfully",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
  getMyAppointment,
  getAllAppointments,
};
