import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  // service
  const result = await CourseServices.createCourseIntoDB(req.body);
  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Course is Created Successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  // service
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Course Successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  // service
  const result = await CourseServices.getSingleCoursesFromDB(courseId);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Single Course Successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  // service
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course is Updated Successfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  // service
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculties Assigned Successfully",
    data: result,
  });
});

const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  // service
  const result = await CourseServices.getFacultiesWithCourseFormDB(courseId);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculties Retrieved Successfully",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  // service
  const result = await CourseServices.removeFacultiesFromCourseIntoDB(courseId, faculties);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculties Assigned Successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  // service
  const result = await CourseServices.deleteCourseIntoDB(courseId);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course is Deleted Successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  getFacultiesWithCourse,
  removeFacultiesFromCourse,
};
