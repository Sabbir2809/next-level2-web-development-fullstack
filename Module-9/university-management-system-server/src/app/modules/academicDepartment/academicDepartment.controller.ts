import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  // service
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Academic Department is Created Successfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  // service
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Academic Department Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  // service
  const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Single Academic Department Successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  // service
  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, req.body);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department Updated Successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
