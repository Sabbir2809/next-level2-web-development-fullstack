import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";
import AcademicFaculty from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import OfferedCourse from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  let {
    semesterRegistrationId,
    academicFacultyId,
    academicDepartmentId,
    academicSemesterId,
    courseId,
    facultyId,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // check if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistrationId);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "Semester Registration Not Found!");
  }

  academicSemesterId = isSemesterRegistrationExists.academicSemesterId;
  if (!academicSemesterId) {
    throw new AppError(404, "academicSemesterId Not Found!");
  }

  const isAcademicFacultyExists = await AcademicFaculty.findById(academicFacultyId);
  if (!isAcademicFacultyExists) {
    throw new AppError(404, "Academic Faculty Not Found!");
  }

  const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartmentId);
  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "Academic Department Not Found!");
  }

  const isCourseExists = await Course.findById(courseId);
  if (!isCourseExists) {
    throw new AppError(404, "Course Not Found!");
  }

  const isFacultyExists = await Faculty.findById(facultyId);
  if (!isFacultyExists) {
    throw new AppError(404, "Faculty Not Found!");
  }

  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartmentId,
    academicFacultyId,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
  }

  // check if the course same  offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
    semesterRegistrationId,
    courseId,
    section,
  });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(400, `Offered Course with same section is already exist!`);
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistrationId,
    facultyId,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(409, `This faculty is not available at that time! choose other time or day`);
  }

  const result = await OfferedCourse.create({ ...payload, academicSemesterId });
  return result;
};

const getOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<IOfferedCourse, "facultyId" | "days" | "startTime" | "endTime">
) => {
  const { facultyId, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(404, "Offered Course Not Found!");
  }

  const isFacultyExists = await Faculty.findById(facultyId);
  if (!isFacultyExists) {
    throw new AppError(404, "Faculty Course Not Found!");
  }

  // get the schedules of the faculties
  const semesterRegistrationId = isOfferedCourseExists.semesterRegistrationId;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistrationId);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      400,
      `You can not updated this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistrationId,
    facultyId,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(409, `This faculty is not available at that time! choose other time or day`);
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
