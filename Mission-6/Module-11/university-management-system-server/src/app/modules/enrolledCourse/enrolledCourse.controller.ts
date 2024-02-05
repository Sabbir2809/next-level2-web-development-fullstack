import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = (req as any).user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Student is enrolled Successfully",
    data: result,
  });
});

const getMyEnrolledCourse = catchAsync(async (req, res) => {
  const userId = (req as any).user.userId;
  const result = await EnrolledCourseServices.getMyEnrolledCourseFromDB(userId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get My Enrolled Courses Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = (req as any).user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(facultyId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Marks is updated Successfully",
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourse,
  updateEnrolledCourseMarks,
};
