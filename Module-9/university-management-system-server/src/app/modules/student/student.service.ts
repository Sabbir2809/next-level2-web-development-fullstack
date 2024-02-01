import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentSearchableFields = ["email", "name.firstName", "name.lastName", "presentAddress"];

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("userId")
      .populate("admissionSemesterId")
      .populate({
        path: "academicDepartmentId",
        populate: {
          path: "academicFacultyId",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemesterId")
    .populate({
      path: "academicDepartmentId",
      populate: {
        path: "academicFacultyId",
      },
    });
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<IStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian)) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleStudentFromDB = async (id: string) => {
  const isExits = await Student.findById(id);
  if (!isExits) {
    throw new AppError(404, "Student id is does not exist");
  }
  // startSession
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
    if (!deletedStudent) {
      throw new AppError(400, "Failed to delete student");
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.userId;

    const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
    if (!deletedUser) {
      throw new AppError(400, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, "Failed to delete Student");
  }
};

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteSingleStudentFromDB,
};
