import { Router } from "express";
import { PatientControllers } from "./patient.controller";
const router = Router();

router.get("/", PatientControllers.getAllFromDB);

router.get("/:id", PatientControllers.getIdFromDB);

router.patch("/:id", PatientControllers.updateIntoDB);

router.delete("/:id", PatientControllers.permanentDelete);

router.delete("/soft/:id", PatientControllers.softDelete);

export const PatientRoutes = router;
