import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    academicFacultyId: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartment = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartment) {
//     throw new AppError(404, "This Department is Already Exists!");
//   }
//   next();
// });

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartment = await AcademicDepartment.findOne(query);
  if (!isDepartment) {
    throw new AppError(404, "This Department does not Exists!");
  }
  next();
});

const AcademicDepartment = model<IAcademicDepartment>("AcademicDepartment", academicDepartmentSchema);
export default AcademicDepartment;
