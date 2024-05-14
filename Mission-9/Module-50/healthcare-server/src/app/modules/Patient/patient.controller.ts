import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { patientFilterableFields } from "./patient.constant";
import { PatientServices } from "./patient.service";

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PatientServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Data Fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getIdFromDB = catchAsync(async (req, res) => {
  const result = await PatientServices.getIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Data Fetched by Id",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const result = await PatientServices.updateIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Data Updated",
    data: result,
  });
});

const permanentDelete = catchAsync(async (req, res) => {
  const result = await PatientServices.permanentDeleteInto(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Data Deleted!",
    data: result,
  });
});

const softDelete = catchAsync(async (req, res) => {
  const result = await PatientServices.softDeleteIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Data Deleted!",
    data: result,
  });
});

export const PatientControllers = {
  getAllFromDB,
  getIdFromDB,
  updateIntoDB,
  permanentDelete,
  softDelete,
};
