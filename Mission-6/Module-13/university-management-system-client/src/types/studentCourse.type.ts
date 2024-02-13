export type TEnrolledCourse = {
  _id: string;
  semesterRegistrationId: string;
  academicSemesterId: string;
  academicFacultyId: string;
  academicDepartmentId: string;
  courseId: TCourse;
  facultyId: string;
  offeredCourseId: TOfferedCourse;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: any[];
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
};

type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: any[];
  isDeleted: boolean;
};

type TOfferedCourse = {
  _id: string;
  semesterRegistrationId: string;
  academicFacultyId: string;
  academicDepartmentId: string;
  academicSemesterId: string;
  courseId: string;
  facultyId: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
