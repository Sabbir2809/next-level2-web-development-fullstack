import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { UserControllers } from "./user.controller";
const router = Router();

router.post("/create-admin", checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN), UserControllers.createAdmin);

export const UserRoutes = router;
