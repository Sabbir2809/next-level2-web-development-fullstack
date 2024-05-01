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

const getMySchedules = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await DoctorScheduleServices.getMySchedulesFormDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Doctor Schedules Fetched Successfully",
    data: result,
  });
});

const deleteMySchedule = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const scheduleId = req.params.scheduleId;
  const result = await DoctorScheduleServices.deleteMyScheduleIntoDB(scheduleId, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Schedules Deleted Successfully",
    data: result,
  });
});

const getAllDoctorSchedules = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await DoctorScheduleServices.getAllDoctorSchedulesFormDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All Doctor Schedules Fetched Successfully",
    data: result,
  });
});

export const DoctorScheduleControllers = {
  createDoctorSchedule,
  getMySchedules,
  deleteMySchedule,
  getAllDoctorSchedules,
};
