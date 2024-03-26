import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { userFilterableFields } from "./user.constant";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created Successfully",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  const result = await UserServices.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Created Successfully",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await UserServices.createPatient(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Created Successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users Data Fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const result = await UserServices.changeProfileStatusIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Profile Status Change Successfully!",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
};
