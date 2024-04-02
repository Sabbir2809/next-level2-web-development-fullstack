import { z } from "zod";

const submitAdoptionRequest = z.object({
  body: z.object({
    petId: z.string({ required_error: "petId Field is Required" }),
    petOwnershipExperience: z.string({
      required_error: "petOwnershipExperience Field is Required",
    }),
  }),
});

const updateSubmitAdoptionRequestStatus = z.object({
  body: z.object({
    status: z.string({ required_error: "status Field is Required" }),
  }),
});

export const AdoptionRequestValidationSchemes = {
  submitAdoptionRequest,
  updateSubmitAdoptionRequestStatus,
};
