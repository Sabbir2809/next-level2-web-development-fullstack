import { Types } from "mongoose";

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export interface IOfferedCourse {
  semesterRegistrationId: Types.ObjectId;
  academicSemesterId: Types.ObjectId;
  academicFacultyId: Types.ObjectId;
  academicDepartmentId: Types.ObjectId;
  courseId: Types.ObjectId;
  facultyId: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: [TDays];
  startTime: string;
  endTime: string;
}

export type TSchedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};
