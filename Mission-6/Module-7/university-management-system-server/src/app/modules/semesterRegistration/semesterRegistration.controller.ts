import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  // service
  const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Semester Registration is Created Successfully",
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  // service
  const result = await SemesterRegistrationServices.getSemesterRegistrationsFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Semester Registration is Retrieved Successfully",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  // service
  const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Semester Registration is Retrieved Successfully",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  // service
  const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Semester Registration Updated Successfully",
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
