import { Router } from "express";
import { AdminControllers } from "./admin.controller";
const router = Router();

router.get("/", AdminControllers.getAllFromDB);

router.get("/:id", AdminControllers.getIdFromDB);

router.patch("/:id", AdminControllers.updateIntoDB);

router.delete("/:id", AdminControllers.permanentDeleteFromDB);

router.delete("/soft/:id", AdminControllers.softDeleteFromDB);

export const AdminRoutes = router;
