import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";
const router = Router();

router.post("/login", validationRequest(AuthValidations.login), AuthControllers.login);

router.post(
  "/refresh-token",
  validationRequest(AuthValidations.refreshToken),
  checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthControllers.refreshToken
);

router.post(
  "/change-password",
  validationRequest(AuthValidations.changePassword),
  checkAuth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthControllers.changePassword
);

router.post("/forget-password", AuthControllers.forgetPassword);

router.post("/reset-password", AuthControllers.resetPassword);

export const AuthRoutes = router;
