import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validationRequest from "../../middlewares/validationRequest";
import { DoctorControllers } from "./doctor.controller";
import { DoctorValidations } from "./doctor.validation";
const router = Router();

router.get("/", DoctorControllers.getAllFromDB);

router.get(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  DoctorControllers.getIdFromDB
);

router.patch(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  validationRequest(DoctorValidations.update),
  DoctorControllers.updateIntoDB
);

router.delete(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  DoctorControllers.permanentDeleteFromDB
);

router.delete(
  "/soft/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  DoctorControllers.softDeleteFromDB
);

export const DoctorRoutes = router;
