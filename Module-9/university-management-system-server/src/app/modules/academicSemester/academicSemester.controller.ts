import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  // service
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic Semester is Created Successfully",
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  // service
  const result = await AcademicSemesterServices.getAcademicSemestersFromDB();
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Academic Semester Successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  // service
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Single Academic Semester Successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  // service
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId, req.body);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Semester Updated Successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
