import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { SaleControllers } from "./sale.controller";
import { SaleValidations } from "./sale.validation";
const router = express.Router();

// create sale
router.post(
  "/create-sell",
  checkAuth(),
  validateRequest(SaleValidations.createSaleValidationSchema),
  SaleControllers.createSale
);
router.get("/stats", checkAuth(), SaleControllers.getDashboardStatistics);
// get all history
router.get("/:salesPeriod", checkAuth(), SaleControllers.getSalesHistory);

export const SaleRoutes = router;
