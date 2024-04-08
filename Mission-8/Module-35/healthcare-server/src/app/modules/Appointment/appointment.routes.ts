import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { AppointmentControllers } from "./appointment.controller";

const router = Router();

router.post("/", checkAuth(UserRole.PATIENT), AppointmentControllers.createAppointment);

export const AppointmentRoutes = router;
