import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGender = "Male" | "Female";

export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface IFaculty {
  id: string;
  userId: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartmentId: Types.ObjectId;
  isDeleted: boolean;
}

export interface FacultyModel extends Model<IFaculty> {
  isUserExists(id: string): Promise<IFaculty | null>;
}
