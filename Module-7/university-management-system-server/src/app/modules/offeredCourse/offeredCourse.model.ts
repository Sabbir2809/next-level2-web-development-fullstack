import { Schema, model } from "mongoose";
import { Days } from "./offeredCourse.constant";
import { IOfferedCourse } from "./offeredCourse.interface";

const semesterRegistrationSchema = new Schema<IOfferedCourse>(
  {
    semesterRegistrationId: {
      type: Schema.Types.ObjectId,
      ref: "SemesterRegistration",
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
    academicSemesterId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    maxCapacity: { type: Number, required: true },
    section: { type: Number, required: true },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const OfferedCourse = model<IOfferedCourse>("OfferedCourse", semesterRegistrationSchema);
export default OfferedCourse;
