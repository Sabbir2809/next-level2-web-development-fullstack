import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  // service
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic Faculty is Created Successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  // service
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Academic Faculty Successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  // service
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Single Academic Faculty Successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  // service
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.body);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty Updated Successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
