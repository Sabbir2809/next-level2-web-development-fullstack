import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { ScheduleServices } from "./schedule.service";

const createSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Created Successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const user = (req as JwtPayload).user;

  const result = await ScheduleServices.getAllSchedulesFormDB(filters, options, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All Schedules Fetched Successfully",
    data: result,
  });
});

export const ScheduleControllers = {
  createSchedule,
  getAllSchedules,
};
