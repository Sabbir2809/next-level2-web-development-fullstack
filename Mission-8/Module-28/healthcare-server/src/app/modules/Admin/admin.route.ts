import { Router } from "express";
import validationRequest from "../../middlewares/validationRequest";
import { AdminControllers } from "./admin.controller";
import { AdminValidationSchemes } from "./admin.validation";
const router = Router();

router.get("/", AdminControllers.getAllFromDB);

router.get("/:id", AdminControllers.getIdFromDB);

router.patch("/:id", validationRequest(AdminValidationSchemes.update), AdminControllers.updateIntoDB);

router.delete("/:id", AdminControllers.permanentDeleteFromDB);

router.delete("/soft/:id", AdminControllers.softDeleteFromDB);

export const AdminRoutes = router;
