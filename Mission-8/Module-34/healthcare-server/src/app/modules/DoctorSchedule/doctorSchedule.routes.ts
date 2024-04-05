import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { DoctorScheduleControllers } from "./doctorSchedule.controller";
const router = Router();

router.get(
  "/my-schedule",
  checkAuth(UserRole.DOCTOR),
  DoctorScheduleControllers.getDoctorSchedules
);

router.post("/", checkAuth(UserRole.DOCTOR), DoctorScheduleControllers.createDoctorSchedule);

export const DoctorScheduleRoutes = router;
