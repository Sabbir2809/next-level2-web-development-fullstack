import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { UserAuthControllers } from "./userAuth.controller";
import { UserValidations } from "./userAuth.validation";

const router = express.Router();

// Registration
router.post(
  "/register",
  validateRequest(UserValidations.userRegistrationValidationSchema),
  UserAuthControllers.userRegistration
);
// Login
router.post(
  "/login",
  validateRequest(UserValidations.userLoginValidationSchema),
  UserAuthControllers.userLogin
);
// refresh Token create
router.post(
  "/refresh-token",
  validateRequest(UserValidations.refreshTokenValidationSchema),
  UserAuthControllers.refreshToken
);

router.get("/me", checkAuth("buyer", "seller"), UserAuthControllers.getMe);

export const UserAuthRoutes = router;
