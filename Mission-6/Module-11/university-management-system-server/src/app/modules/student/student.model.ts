import { Schema, model } from "mongoose";
import { IStudent, TGuardian, TLocalGuardian, TUserName } from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [12, "First name can not be more then 12 character"],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: { type: String, required: [true, "Father's occupation is required"] },
  fatherContactNo: { type: String, required: [true, "Father's contact number is required"] },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: { type: String, required: [true, "Mother's occupation is required"] },
  motherContactNo: { type: String, required: [true, "Mother's contact number is required"] },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: { type: String, required: [true, "Local guardian's occupation is required"] },
  contactNo: { type: String, required: [true, "Local guardian's contact number is required"] },
  address: { type: String, required: [true, "Local guardian's address is required"] },
});

// 1. Create an interface representing a document in MongoDB.
const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: [true, "Student ID is required"], unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "userId is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: { type: String, required: [true, "Emergency contact number is required"] },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: { type: String, required: [true, "Present address is required"] },
    permanentAddress: { type: String, required: [true, "Permanent address is required"] },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian details are required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian details are required"],
    },
    profileImage: { type: String, default: "" },
    admissionSemesterId: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic admissionSemesterId is required"],
      ref: "AcademicSemester",
    },
    academicDepartmentId: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic DepartmentId is required"],
      ref: "AcademicDepartment",
    },
    academicFacultyId: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic academicFacultyId is required"],
      ref: "AcademicFaculty",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true, toJSON: { virtuals: true } }
);

// query middleware
studentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Student = model<IStudent>("Student", studentSchema);
