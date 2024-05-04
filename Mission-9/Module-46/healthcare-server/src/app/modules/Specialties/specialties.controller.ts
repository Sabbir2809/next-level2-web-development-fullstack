import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SpecialtiesServices } from "./specialties.service";

const getAllSpecialties = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.getAllSpecialtiesFormDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Fetched Successfully",
    data: result,
  });
});

const createSpecialty = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.createSpecialtyIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialty created Successfully",
    data: result,
  });
});

const deleteSpecialty = catchAsync(async (req, res) => {
  await SpecialtiesServices.deleteSpecialtyIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialty Deleted Successfully",
    data: null,
  });
});

export const SpecialtiesControllers = {
  createSpecialty,
  getAllSpecialties,
  deleteSpecialty,
};
