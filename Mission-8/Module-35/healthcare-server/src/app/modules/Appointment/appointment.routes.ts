import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AppointmentControllers } from "./appointment.controller";
import { AppointmentValidations } from "./appointment.validation";

const router = Router();

router.get(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  AppointmentControllers.getMyAppointment
);

router.get(
  "/my-appointment",
  checkAuth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentControllers.getMyAppointment
);

router.post(
  "/",
  checkAuth(UserRole.PATIENT),
  validationRequest(AppointmentValidations.create),
  AppointmentControllers.createAppointment
);

export const AppointmentRoutes = router;
