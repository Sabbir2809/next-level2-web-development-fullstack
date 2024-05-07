import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { ScheduleControllers } from "./schedule.controller";
const router = Router();

router.get(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleControllers.getScheduleById
);

router.get(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleControllers.getAllSchedules
);

router.post(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  ScheduleControllers.createSchedule
);

router.delete(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  ScheduleControllers.deleteSchedule
);

export const ScheduleRoutes = router;
