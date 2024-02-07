import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";
import AcademicFaculty from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { Student } from "../student/student.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import OfferedCourse from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
  let {
    semesterRegistrationId,
    academicFacultyId,
    academicDepartmentId,
    academicSemesterId,
    courseId,
    facultyId,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // check if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistrationId);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, "Semester Registration Not Found!");
  }

  academicSemesterId = isSemesterRegistrationExists.academicSemesterId;
  if (!academicSemesterId) {
    throw new AppError(404, "academicSemesterId Not Found!");
  }

  const isAcademicFacultyExists = await AcademicFaculty.findById(academicFacultyId);
  if (!isAcademicFacultyExists) {
    throw new AppError(404, "Academic Faculty Not Found!");
  }

  const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartmentId);
  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "Academic Department Not Found!");
  }

  const isCourseExists = await Course.findById(courseId);
  if (!isCourseExists) {
    throw new AppError(404, "Course Not Found!");
  }

  const isFacultyExists = await Faculty.findById(facultyId);
  if (!isFacultyExists) {
    throw new AppError(404, "Faculty Not Found!");
  }

  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartmentId,
    academicFacultyId,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
  }

  // check if the course same  offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = await OfferedCourse.findOne({
    semesterRegistrationId,
    courseId,
    section,
  });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(400, `Offered Course with same section is already exist!`);
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistrationId,
    facultyId,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(409, `This faculty is not available at that time! choose other time or day`);
  }

  const result = await OfferedCourse.create({ ...payload, academicSemesterId });
  return result;
};

const getOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getMyOfferedCourses = async (userId: string, query: Record<string, unknown>) => {
  // pagination setup
  let page = Number(query?.page) || 1;
  let limit = Number(query?.limit) || 10;
  let skip = (page - 1) * limit;

  // find the student
  const student = await Student.findOne({ id: userId });
  if (!student) {
    throw new AppError(404, "User is not found");
  }

  // find current ongoing semester
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne({ status: "ONGOING" });
  if (!currentOngoingRegistrationSemester) {
    throw new AppError(404, "There is no ongoing semester registration");
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistrationId: currentOngoingRegistrationSemester?._id,
        academicFacultyId: student.academicFacultyId,
        academicDepartmentId: student.academicDepartmentId,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentOngoingRegistrationSemester: currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$semesterRegistrationId", "$$currentOngoingRegistrationSemester"],
                  },
                  {
                    $eq: ["$studentId", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourses",
      },
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$studentId", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isCompleted", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.courseId",
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            {
              $eq: ["$courseId.preRequisiteCourses", []],
            },
            {
              $setIsSubset: ["$course.preRequisiteCourses.courseId", "$completedCourseIds"],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            "$course._id",
            {
              $map: {
                input: "$enrolledCourses",
                as: "enroll",
                in: "$$enroll.courseId",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourse.aggregate([...aggregationQuery, ...paginationQuery]);

  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<IOfferedCourse, "facultyId" | "days" | "startTime" | "endTime">
) => {
  const { facultyId, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(404, "Offered Course Not Found!");
  }

  const isFacultyExists = await Faculty.findById(facultyId);
  if (!isFacultyExists) {
    throw new AppError(404, "Faculty Course Not Found!");
  }

  // get the schedules of the faculties
  const semesterRegistrationId = isOfferedCourseExists.semesterRegistrationId;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistrationId);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      400,
      `You can not updated this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistrationId,
    facultyId,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(409, `This faculty is not available at that time! choose other time or day`);
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(404, "Offered Course not found");
  }

  const semesterRegistrationId = isOfferedCourseExists.semesterRegistrationId;

  const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistrationId).select(
    "status"
  );

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      400,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getOfferedCoursesFromDB,
  getMyOfferedCourses,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
