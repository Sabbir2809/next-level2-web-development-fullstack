import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validationRequest from "../../middlewares/validationRequest";
import { ScheduleControllers } from "./schedule.controller";
import { ScheduleValidations } from "./schedule.validation";
const router = Router();

router.get(
  "/:id",
  checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleControllers.getScheduleById
);

router.get(
  "/",
  checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleControllers.getAllSchedules
);

router.post(
  "/",
  checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validationRequest(ScheduleValidations.create),
  ScheduleControllers.createSchedule
);

router.delete(
  "/:id",
  checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleControllers.deleteSchedule
);

export const ScheduleRoutes = router;
