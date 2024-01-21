import { Types } from "mongoose";

export type TEnrolledCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TGrade = "A" | "B" | "C" | "D" | "F" | "NA";

export interface IEnrolledCourse {
  semesterRegistrationId: Types.ObjectId;
  academicSemesterId: Types.ObjectId;
  academicFacultyId: Types.ObjectId;
  academicDepartmentId: Types.ObjectId;
  offeredCourseId: Types.ObjectId;
  courseId: Types.ObjectId;
  studentId: Types.ObjectId;
  facultyId: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TEnrolledCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
}
