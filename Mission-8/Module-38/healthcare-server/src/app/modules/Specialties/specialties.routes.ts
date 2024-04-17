import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { fileUploader } from "../../utils/fileUploader";
import { SpecialtiesControllers } from "./specialties.controller";
import { SpecialtiesValidations } from "./specialties.validation";
const router = Router();

router.get(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  SpecialtiesControllers.getAllSpecialties
);

router.post(
  "/",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidations.create.parse(JSON.parse(req.body.data));
    return SpecialtiesControllers.createSpecialty(req, res, next);
  }
);

router.delete(
  "/:id",
  checkAuth(UserRole.SUER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  SpecialtiesControllers.deleteSpecialty
);

export const SpecialtiesRoutes = router;
