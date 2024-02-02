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
  updateEnrolledCourseMarks,
};
