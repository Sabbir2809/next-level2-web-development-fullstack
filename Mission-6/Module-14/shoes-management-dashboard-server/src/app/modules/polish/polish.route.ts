import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { PolishControllers } from "./polish.controller";
import { polishValidations } from "./polish.validation";
const router = express.Router();

// create polish request
router.post(
  "/create-polish-request",
  checkAuth("buyer"),
  validateRequest(polishValidations.polishRequestValidationSchema),
  PolishControllers.createPolishRequest
);

// get All polish requests
router.get("/all-polish-requests", checkAuth("seller"), PolishControllers.getAllPolishRequests);

// update polish request status
router.put(
  "/polish-request-status/:polishId",
  checkAuth("seller"),
  PolishControllers.updatePolishRequestStatus
);

export const PolishRoutes = router;
