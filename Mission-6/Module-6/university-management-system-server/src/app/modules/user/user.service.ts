import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { Admin } from "../admin/admin.model";
import { IFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { CloudinaryImage, IUser } from "./user.interface";
import User from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";

const createStudentIntoDB = async (file: any, password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "student";
  // set student email
  userData.email = payload.email;

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemesterId);
  if (!admissionSemester) {
    throw new AppError(404, "Admission semester not found");
  }
  userData.id = await generateStudentId(admissionSemester);

  const session = await mongoose.startSession();
  try {
    // startTransaction()
    session.startTransaction();

    // send image to cloudinary
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;

    const profileImage = await sendImageToCloudinary(imageName, path);
    const cloudinaryImage = profileImage as CloudinaryImage;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(400, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;
    payload.profileImage = cloudinaryImage.secure_url;

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, "Failed to create student");
    }
    // commitTransaction() and endSession()
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    // abortTransaction() and endSession()
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, "Failed to create user");
  }
};

const createFacultyIntoDB = async (file: any, password: string, payload: IFaculty) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";
  // set faculty email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartmentId);

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    //send image to cloudinary
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;

    const profileImage = await sendImageToCloudinary(imageName, path);
    const cloudinaryImage = profileImage as CloudinaryImage;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id; //reference _id
    payload.profileImage = cloudinaryImage.secure_url;

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (file: any, password: string, payload: IFaculty) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  // set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    //send image to cloudinary
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;

    const profileImage = await sendImageToCloudinary(imageName, path);
    const cloudinaryImage = profileImage as CloudinaryImage;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id; //reference _id
    payload.profileImage = cloudinaryImage.secure_url;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === "student") {
    result = await Student.findOne({ id: userId })
      .populate("admissionSemesterId")
      .populate({
        path: "academicDepartmentId",
        populate: {
          path: "academicFacultyId",
        },
      });
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("academicDepartmentId");
  }
  if (role === "admin") {
    result = await Admin.findOne({ id: userId });
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
