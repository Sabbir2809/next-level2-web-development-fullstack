import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { doctorFilterableFields } from "./doctor.constant";
import { DoctorServices } from "./doctor.service";

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, doctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await DoctorServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data Fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getIdFromDB = catchAsync(async (req, res) => {
  const result = await DoctorServices.getIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data Fetched by Id",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const result = await DoctorServices.updateIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data updated",
    data: result,
  });
});

const permanentDeleteFromDB = catchAsync(async (req, res) => {
  const result = await DoctorServices.permanentDeleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data Deleted!",
    data: result,
  });
});

const softDeleteFromDB = catchAsync(async (req, res) => {
  const result = await DoctorServices.softDeleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data Deleted!",
    data: result,
  });
});

export const DoctorControllers = {
  getAllFromDB,
  getIdFromDB,
  updateIntoDB,
  permanentDeleteFromDB,
  softDeleteFromDB,
};
