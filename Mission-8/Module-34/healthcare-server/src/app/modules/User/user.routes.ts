import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validationRequest from "../../middlewares/validationRequest";
import { fileUploader } from "../../utils/fileUploader";
import { UserControllers } from "./user.controller";
import { UserValidationSchemes } from "./user.validation";
const router = Router();

router.get("/", checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN), UserControllers.getAllFromDB);

router.get(
  "/me",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  UserControllers.getMyProfile
);

router.post(
  "/create-admin",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchemes.createAdmin.parse(JSON.parse(req.body.data));
    return UserControllers.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchemes.createDoctor.parse(JSON.parse(req.body.data));
    return UserControllers.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchemes.createPatient.parse(JSON.parse(req.body.data));
    return UserControllers.createPatient(req, res, next);
  }
);

router.patch(
  "/:id/status",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  validationRequest(UserValidationSchemes.changeProfileStatus),
  UserControllers.changeProfileStatus
);

router.patch(
  "/update-my-profile",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return UserControllers.updateMyProfile(req, res, next);
  }
);

export const UserRoutes = router;
