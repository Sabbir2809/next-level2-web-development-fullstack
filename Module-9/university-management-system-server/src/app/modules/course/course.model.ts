import { Schema, model } from "mongoose";
import { ICourse, ICourseFaculty, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, unique: true, trim: true, required: true },
    prefix: { type: String, trim: true, required: true },
    code: { type: Number, trim: true, required: true },
    credits: { type: Number, trim: true, required: true },
    preRequisiteCourses: { type: [preRequisiteCoursesSchema], trim: true, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Course = model<ICourse>("Course", courseSchema);

const courseFacultySchema = new Schema<ICourseFaculty>(
  {
    courseId: { type: Schema.Types.ObjectId, unique: true, ref: "Course" },
    faculties: { type: [{ type: Schema.Types.ObjectId, ref: "Faculty" }] },
  },
  { timestamps: true, versionKey: false }
);

export const CourseFaculty = model<ICourseFaculty>("CourseFaculty", courseFacultySchema);
