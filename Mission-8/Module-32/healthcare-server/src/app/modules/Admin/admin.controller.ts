import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { AdminServices } from "./admin.service";

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getIdFromDB = catchAsync(async (req, res) => {
  const result = await AdminServices.getIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Fetched by Id",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const result = await AdminServices.updateIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data updated",
    data: result,
  });
});

const permanentDeleteFromDB = catchAsync(async (req, res) => {
  const result = await AdminServices.permanentDeleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted!",
    data: result,
  });
});

const softDeleteFromDB = catchAsync(async (req, res) => {
  const result = await AdminServices.softDeleteFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted!",
    data: result,
  });
});

export const AdminControllers = {
  getAllFromDB,
  getIdFromDB,
  updateIntoDB,
  permanentDeleteFromDB,
  softDeleteFromDB,
};
