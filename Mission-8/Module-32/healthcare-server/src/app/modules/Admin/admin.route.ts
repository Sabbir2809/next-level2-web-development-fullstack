import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AdminControllers } from "./admin.controller";
import { AdminValidationSchemes } from "./admin.validation";
const router = Router();

router.get("/", checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN), AdminControllers.getAllFromDB);

router.get("/:id", checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN), AdminControllers.getIdFromDB);

router.patch(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN),
  validationRequest(AdminValidationSchemes.update),
  AdminControllers.updateIntoDB
);

router.delete("/:id", checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN), AdminControllers.permanentDeleteFromDB);

router.delete("/soft/:id", checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN), AdminControllers.softDeleteFromDB);

export const AdminRoutes = router;
