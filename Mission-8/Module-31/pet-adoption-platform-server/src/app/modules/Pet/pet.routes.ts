import { Router } from "express";
import checkAuth from "../../middlewares/CheckAuth";
import validationRequest from "../../middlewares/validationRequest";
import { PetControllers } from "./pet.controller";
import { PetValidationSchemas } from "./pet.validation";
const petRoute = Router();

// Get Paginated and Filtered Pets
// Endpoint: GET - BASE-URL/api/pets
// Request Headers: Authorization: <JWT_TOKEN>
petRoute.get("/pets", checkAuth(), PetControllers.getAllPets);

// Add a Pet
// Endpoint: POST - BASE-URL/api/pets
// Request Headers: Authorization: <JWT_TOKEN>
petRoute.post(
  "/pets",
  checkAuth(),
  validationRequest(PetValidationSchemas.addPet),
  PetControllers.addPet
);

// Update Pet profile
// Endpoint: PUT - BASE-URL/api/pets/:petId
// Request Headers: Authorization: <JWT_TOKEN>
petRoute.put(
  "/pets/:petId",
  checkAuth(),
  validationRequest(PetValidationSchemas.updatePetProfile),
  PetControllers.updatePetProfile
);

export const PetRoutes = petRoute;
