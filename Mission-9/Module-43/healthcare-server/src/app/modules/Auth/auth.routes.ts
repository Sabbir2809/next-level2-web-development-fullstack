import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { AuthControllers } from "./auth.controller";
const router = Router();

router.post("/login", AuthControllers.login);

router.post(
  "/refresh-token",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthControllers.refreshToken
);

router.post(
  "/change-password",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthControllers.changePassword
);

router.post("/forget-password", AuthControllers.forgetPassword);

router.post("/reset-password", AuthControllers.resetPassword);

export const AuthRoutes = router;
