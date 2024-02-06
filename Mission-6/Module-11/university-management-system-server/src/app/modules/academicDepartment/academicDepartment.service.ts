import QueryBuilder from "../../builder/QueryBuilder";
import { IAcademicDepartment } from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async (query: Record<string, unknown>) => {
  const AcademicDepartmentSearchableFields = ["name"];

  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate("academicFacultyId"),
    query
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result = await AcademicDepartment.findById(departmentId).populate("academicFacultyId");
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate({ _id: departmentId }, payload, { new: true });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
