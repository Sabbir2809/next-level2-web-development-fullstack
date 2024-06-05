import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { PaymentControllers } from "./payment.controller";

const router = Router();

router.get("/ipn", PaymentControllers.validatePayment);

router.post(
  "/init-payment/:appointmentId",
  checkAuth(UserRole.PATIENT),
  PaymentControllers.initPayment
);

export const PaymentRoutes = router;
