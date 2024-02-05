import { Types } from "mongoose";

export type TPreRequisiteCourses = {
  courseId: Types.ObjectId;
  isDeleted: boolean;
};

export interface ICourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
}

export interface ICourseFaculty {
  courseId: Types.ObjectId;
  faculties: [Types.ObjectId];
}
