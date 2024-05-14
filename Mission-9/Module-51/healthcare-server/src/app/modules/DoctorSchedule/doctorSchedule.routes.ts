import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { DoctorScheduleControllers } from "./doctorSchedule.controller";
const router = Router();

router.get("/", checkAuth(UserRole.DOCTOR), DoctorScheduleControllers.getAllDoctorSchedules);

router.get("/my-schedule", checkAuth(UserRole.DOCTOR), DoctorScheduleControllers.getMySchedules);

router.post("/", checkAuth(UserRole.DOCTOR), DoctorScheduleControllers.createDoctorSchedule);

router.delete(
  "/:scheduleId",
  checkAuth(UserRole.DOCTOR),
  DoctorScheduleControllers.deleteMySchedule
);

export const DoctorScheduleRoutes = router;
