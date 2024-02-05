import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(404, "Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};

const updateAcademicSemesterIntoDB = async (semesterId: string, payload: Partial<IAcademicSemester>) => {
  if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(404, "Invalid Semester Code");
  }
  const result = await AcademicSemester.findByIdAndUpdate({ _id: semesterId }, payload, { new: true });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
