import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { PrescriptionControllers } from "./prescription.controller";
const router = Router();

router.post("/", checkAuth(UserRole.DOCTOR), PrescriptionControllers.createPrescription);
router.get(
  "/my-prescription",
  checkAuth(UserRole.PATIENT),
  PrescriptionControllers.getPatientPrescription
);

export const PrescriptionRoutes = router;
