import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CourseSearchableFields } from "./course.constant";
import { ICourse, ICourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";

const createCourseIntoDB = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find().populate("preRequisiteCourses.courseId"), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate("preRequisiteCourses.courseId");
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // step-1: basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemainingData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updatedBasicCourseInfo) {
      throw new AppError(400, "Failed to update Course");
    }

    // step-2: check if is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.courseId && el.isDeleted)
        .map((ele) => ele.courseId);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourses: { courseId: { $in: deletedPreRequisites } } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(400, "Failed to update Course");
      }

      // filter out the course fields
      const newPreRequisites = preRequisiteCourses?.filter((el) => el.courseId && !el.isDeleted);

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(400, "Failed to update Course");
      }
      const result = await Course.findById(id).populate("preRequisiteCourses.courseId");
      return result;
    }
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(400, "Failed to update Course");
  }
};

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<ICourseFaculty>) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      courseId: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultiesFromCourseIntoDB = async (id: string, payload: Partial<ICourseFaculty>) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );
  return result;
};

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseIntoDB,
  deleteCourseIntoDB,
};
