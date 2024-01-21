import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { CourseControllers } from "./course.controller";
import { CourseValidations } from "./course.validation";
const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get("/", CourseControllers.getAllCourses);
router.get("/:courseId", auth("admin", "faculty", "student"), CourseControllers.getSingleCourse);
router.patch(
  "/:courseId",
  auth("admin"),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);
router.delete(
  "/:courseId/remove-faculties",
  auth("admin"),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);
router.delete("/:courseId", CourseControllers.deleteCourse);

export const CourseRoutes = router;
