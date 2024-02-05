import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

academicFacultySchema.pre("save", async function (next) {
  const isExistFaculty = await AcademicFaculty.findOne({ name: this.name });
  if (isExistFaculty) {
    throw new AppError(404, "This Faculty is Already Exists");
  }
  next();
});

academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isFaculty = await AcademicFaculty.findOne(query);
  if (!isFaculty) {
    throw new AppError(404, "This Faculty does not Exists!");
  }
});

const AcademicFaculty = model<IAcademicFaculty>("AcademicFaculty", academicFacultySchema);
export default AcademicFaculty;
