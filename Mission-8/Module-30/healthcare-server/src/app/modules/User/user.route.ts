import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { fileUploader } from "../../utils/fileUploader";
import { UserControllers } from "./user.controller";
import { UserValidationSchemes } from "./user.validation";
const router = Router();

router.post(
  "/create-admin",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchemes.createAdmin.parse(JSON.parse(req.body.data));
    return UserControllers.createAdmin(req, res, next);
  }
);

export const UserRoutes = router;
