import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
const router = express.Router();

router.post(
  "/create-academic-semester",
  auth("admin"),
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester
);
router.get("/", AcademicSemesterControllers.getAllAcademicSemesters);
router.get("/:semesterId", AcademicSemesterControllers.getSingleAcademicSemester);
router.patch(
  "/:semesterId",
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.getSingleAcademicSemester
);

export const AcademicSemesterRoutes = router;
