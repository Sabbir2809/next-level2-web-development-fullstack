import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { DoctorScheduleServices } from "./doctorSchedule.service";

const createDoctorSchedule = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;

  const result = await DoctorScheduleServices.createDoctorScheduleIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Schedule Created Successfully",
    data: result,
  });
});

const getDoctorSchedules = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const user = (req as JwtPayload).user;

  const result = await DoctorScheduleServices.getDoctorSchedulesFormDB(filters, options, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Doctor Schedules Fetched Successfully",
    data: result,
  });
});

export const DoctorScheduleControllers = {
  createDoctorSchedule,
  getDoctorSchedules,
};
