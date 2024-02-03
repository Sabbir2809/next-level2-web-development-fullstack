import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  // service
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Offered Course is Created Successfully",
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  // service
  const result = await OfferedCourseServices.getOfferedCoursesFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered Course is Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const { userId } = (req as JwtPayload).user;
  // service
  const result = await OfferedCourseServices.getMyOfferedCourses(userId, req.query);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered Course is Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  // service
  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered Course is Retrieved Successfully",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  // service
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered Course Updated Successfully",
    data: result,
  });
});

const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  // service
  const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered Course Deleted Successfully",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
