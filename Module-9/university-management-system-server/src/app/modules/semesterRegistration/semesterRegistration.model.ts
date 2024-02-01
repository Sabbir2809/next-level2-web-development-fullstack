import { Schema, model } from "mongoose";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";
import { ISemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemesterId: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, required: true, default: 3 },
    maxCredit: { type: Number, required: true, default: 25 },
  },
  { timestamps: true, versionKey: false }
);

const SemesterRegistration = model<ISemesterRegistration>("SemesterRegistration", semesterRegistrationSchema);
export default SemesterRegistration;
