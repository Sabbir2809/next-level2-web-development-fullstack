import mongoose, { Schema } from "mongoose";
import { Grade } from "./enrolledCourse.constant";
import { IEnrolledCourse, TEnrolledCourseMarks } from "./enrolledCourse.interface";

const courseMarksSchema = new Schema<TEnrolledCourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      min: 0,
      max: 30,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    finalTerm: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const enrolledCourseSchema = new Schema<IEnrolledCourse>({
  semesterRegistrationId: {
    type: Schema.Types.ObjectId,
    ref: "SemesterRegistration",
    required: true,
  },
  academicSemesterId: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
    required: true,
  },
  academicFacultyId: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },
  academicDepartmentId: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
    required: true,
  },
  offeredCourseId: {
    type: Schema.Types.ObjectId,
    ref: "OfferedCourse",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  facultyId: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  grade: {
    type: String,
    enum: Grade,
    default: "NA",
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourse = mongoose.model<IEnrolledCourse>("EnrolledCourse", enrolledCourseSchema);

export default EnrolledCourse;
