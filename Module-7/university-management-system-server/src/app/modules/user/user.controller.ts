import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // service
  const result = await UserServices.createStudentIntoDB(req.file, password, studentData);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Student is Created Successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(req.file, password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(req.file, password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = (req as JwtPayload).user;
  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is Retrieved Successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Status is Updated Successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
