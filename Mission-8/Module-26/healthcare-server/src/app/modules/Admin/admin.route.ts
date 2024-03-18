import { Router } from "express";
import { AdminControllers } from "./admin.controller";
const router = Router();

router.get("/", AdminControllers.getAllFromDB);

export const AdminRoutes = router;
