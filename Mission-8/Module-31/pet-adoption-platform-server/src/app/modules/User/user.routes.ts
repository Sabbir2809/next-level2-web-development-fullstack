import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { UserControllers } from "./user.controller";
import { UserValidationSchemas } from "./user.validation";
const userRouter = Router();

// User Registration
// Endpoint: POST - BASE-URL/api/register
userRouter.post(
  "/register",
  validationRequest(UserValidationSchemas.registration),
  UserControllers.registration
);

// Get User Information
// Endpoint: GET - BASE-URL/api/profile
// Request Headers: Authorization: <JWT_TOKEN>
userRouter.get("/profile", checkAuth(), UserControllers.getProfileInformation);

// Update User Information
// Endpoint: PUT - BASE-URL/api/profile
// Request Headers: Authorization: <JWT_TOKEN>
userRouter.put(
  "/profile",
  checkAuth(),
  validationRequest(UserValidationSchemas.updateUserProfile),
  UserControllers.updateUserInformation
);

export const UserRoutes = userRouter;
