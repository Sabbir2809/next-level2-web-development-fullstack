import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistration from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: ISemesterRegistration) => {
  // academicSemesterId
  const academicSemesterId = payload?.academicSemesterId;

  // check if there any registered semester that is already "UPCOMING" | "ONGOING"
  const isThereAnyUpComingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
  });
  if (isThereAnyUpComingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is Already a ${isThereAnyUpComingOrOngoingSemester.status} Registered Semester!`
    );
  }

  // check if the semester is exist
  const isAcademicSemesterExists = await AcademicSemester.findById(academicSemesterId);
  if (!isAcademicSemesterExists) {
    throw new AppError(404, "This Academic Semester Not Found!");
  }

  // check if the semester is already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({ academicSemesterId });
  if (isSemesterRegistrationExist) {
    throw new AppError(409, "This Semester is Already Register");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemesterId"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<ISemesterRegistration>) => {
  // check if the requested registered semester is exists
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(404, "This Semester is Not Found!");
  }

  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(400, `This Semester is Already ${currentSemesterStatus}`);
  }

  // UPCOMING -> ONGOING -> ENDED
  if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
