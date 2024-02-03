import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import OfferedCourse from "../offeredCourse/offeredCourse.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { Student } from "../student/student.model";
import { IEnrolledCourse } from "./enrolledCourse.interface";
import EnrolledCourse from "./enrolledCourse.model";
import { calculateGradeAndPoints } from "./enrolledCourse.utils";

const createEnrolledCourseIntoDB = async (userId: string, payload: IEnrolledCourse) => {
  /**
   * Step-1: check if the offered course is exist
   * Step-2: Check if the student is already enrolled
   * Step-3: check if the max credits exceed
   * Step-4: Create an enrolled course
   */
  const { offeredCourseId } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourseId);
  if (!isOfferedCourseExists) {
    throw new AppError(404, "Offered Course Not Found!");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(400, "Room is Full!");
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });
  if (!student) {
    throw new AppError(404, "studentId Already Exist!");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistrationId: isOfferedCourseExists?.semesterRegistrationId,
    offeredCourseId,
    studentId: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(409, "student Already Enrolled!");
  }

  // check total credits exceeds maxCredit
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExists.semesterRegistrationId
  ).select("maxCredit");

  const maxCredit = semesterRegistration?.maxCredit;

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistrationId: isOfferedCourseExists.semesterRegistrationId,
        studentId: student._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  // total enrolled credits + new enrolled course credit > maxCredit
  const course = await Course.findById(isOfferedCourseExists.courseId);

  const currentCredit = course?.credits;

  const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new AppError(400, "You have exceeded maximum number of credits!");
  }

  // transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistrationId: isOfferedCourseExists.semesterRegistrationId,
          academicSemesterId: isOfferedCourseExists.academicSemesterId,
          academicFacultyId: isOfferedCourseExists.academicFacultyId,
          academicDepartmentId: isOfferedCourseExists.academicDepartmentId,
          offeredCourseId,
          courseId: isOfferedCourseExists.courseId,
          studentId: student._id,
          facultyId: isOfferedCourseExists.facultyId,
          isEnrolled: true,
        },
      ],
      { session }
    );

    if (!result) {
      throw new AppError(400, "Fail to Enroll in this Course!");
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourseId, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMyEnrolledCourseFromDB = async (userId: string, query: Record<string, unknown>) => {
  const student = await Student.findOne({ id: userId });

  if (!student) {
    throw new AppError(404, "Student not found !");
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }).populate(
      "semesterRegistrationId academicSemesterId academicFacultyId academicDepartmentId offeredCourseId courseId studentId facultyId"
    ),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateEnrolledCourseMarksIntoDB = async (facultyId: string, payload: Partial<IEnrolledCourse>) => {
  const { semesterRegistrationId, offeredCourseId, studentId, courseMarks } = payload;

  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistrationId);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "Semester registration not found !");
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourseId);
  if (!isOfferedCourseExists) {
    throw new AppError(404, "Offered course not found !");
  }

  const isStudentExists = await Student.findById(studentId);
  if (!isStudentExists) {
    throw new AppError(404, "Student not found !");
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });
  if (!faculty) {
    throw new AppError(404, "Faculty not found !");
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistrationId,
    offeredCourseId,
    studentId,
    facultyId: faculty._id,
  });
  if (!isCourseBelongToFaculty) {
    throw new AppError(403, "You are forbidden! !");
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2, finalTerm } = isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1) + Math.ceil(midTerm) + Math.ceil(classTest2) + Math.ceil(finalTerm);

    const result = calculateGradeAndPoints(totalMarks);

    console.log(result);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(isCourseBelongToFaculty._id, modifiedData, {
    new: true,
  });

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getMyEnrolledCourseFromDB,
  updateEnrolledCourseMarksIntoDB,
};
