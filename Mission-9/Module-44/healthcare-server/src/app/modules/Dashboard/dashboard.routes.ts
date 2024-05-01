import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { DashboardControllers } from "./dashboard.controller";
const router = Router();

router.get(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  DashboardControllers.dashboardMetadata
);

export const DashboardRoutes = router;
