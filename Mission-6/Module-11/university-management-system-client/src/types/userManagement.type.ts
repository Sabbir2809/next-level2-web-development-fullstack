import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from ".";

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  isDeleted: boolean;
  admissionSemesterId: TAcademicSemester;
  academicDepartmentId: TAcademicDepartment;
  academicFacultyId: TAcademicFaculty;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TName = {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  _id: string;
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  _id: string;
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
