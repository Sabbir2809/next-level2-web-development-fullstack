import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { AdoptionRequestControllers } from "./adoptionRequest.controller";
import { AdoptionRequestValidationSchemes } from "./adoptionRequest.validation";
const adoptionRequestRouter = Router();

// Get Adoption Requests
// Endpoint: GET - BASE-URL/api/adoption-requests
// Request Headers: Authorization: <JWT_TOKEN>
adoptionRequestRouter.get(
  "/adoption-requests",
  checkAuth(),
  AdoptionRequestControllers.getAllAdoptionRequests
);

// Submit Adoption Request
// Endpoint: POST - BASE-URL/api/adoption-requests
// Request Headers: Authorization: <JWT_TOKEN>
adoptionRequestRouter.post(
  "/adoption-request",
  checkAuth(),
  validationRequest(AdoptionRequestValidationSchemes.submitAdoptionRequest),
  AdoptionRequestControllers.submitAdoptionRequest
);

// Update Adoption Request Status
// Endpoint: PUT - BASE-URL/api/adoption-requests/:requestId
// Request Headers: Authorization: <JWT_TOKEN>
adoptionRequestRouter.put(
  "/adoption-requests/:requestId",
  checkAuth(),
  validationRequest(AdoptionRequestValidationSchemes.updateSubmitAdoptionRequestStatus),
  AdoptionRequestControllers.updateAdoptionRequestStatus
);

export const adoptionRequestRoutes = adoptionRequestRouter;
