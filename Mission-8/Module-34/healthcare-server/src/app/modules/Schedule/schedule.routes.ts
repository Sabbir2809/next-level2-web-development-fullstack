import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { ScheduleControllers } from "./schedule.controller";
const router = Router();

router.post(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  ScheduleControllers.createSchedule
);

export const ScheduleRoutes = router;
