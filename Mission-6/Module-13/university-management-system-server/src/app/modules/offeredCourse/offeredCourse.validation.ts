import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format, expected 'HH:MM' in 24 hours format",
  }
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistrationId: z.string(),
      academicFacultyId: z.string(),
      academicDepartmentId: z.string(),
      courseId: z.string(),
      facultyId: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: "startTime should be before endTime" }
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      facultyId: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: "startTime should be before endTime" }
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
