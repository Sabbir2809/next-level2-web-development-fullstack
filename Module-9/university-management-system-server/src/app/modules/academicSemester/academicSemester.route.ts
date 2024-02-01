import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester
);
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicSemesterControllers.getAllAcademicSemesters
);
router.get("/:semesterId", AcademicSemesterControllers.getSingleAcademicSemester);
router.patch(
  "/:semesterId",
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.getSingleAcademicSemester
);

export const AcademicSemesterRoutes = router;
