import { Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// 1. Create an interface representing a document in MongoDB.
export interface IStudent {
  id: string;
  userId: Types.ObjectId;
  name: TUserName;
  gender: "Male" | "Female";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isDeleted: boolean;
  admissionSemesterId: Types.ObjectId;
  academicDepartmentId: Types.ObjectId;
  academicFacultyId: Types.ObjectId;
}
