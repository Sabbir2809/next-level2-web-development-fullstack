import { UserRole } from "@prisma/client";

import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { upload } from "../../utils/fileUploader";
import { UserControllers } from "./user.controller";
const router = Router();

router.post(
  "/create-admin",
  upload.single("file"),
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  UserControllers.createAdmin
);

export const UserRoutes = router;
