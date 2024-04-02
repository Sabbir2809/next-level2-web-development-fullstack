import { z } from "zod";

const addPet = z.object({
  body: z.object({
    name: z.string({ required_error: "Name Field is Required" }),
    species: z.string({ required_error: "Species Field is Required" }),
    breed: z.string({ required_error: "Breed Field is Required" }),
    age: z.number({ required_error: "Age Field is Required" }),
    size: z.string({ required_error: "Size Field is Required" }),
    location: z.string({ required_error: "Location Field is Required" }),
    description: z.string({ required_error: "Description Field is Required" }),
    temperament: z.string({ required_error: "Temperament Field is Required" }),
    medicalHistory: z.string({ required_error: "MedicalHistory Field is Required" }),
    adoptionRequirements: z.string({ required_error: "AdoptionRequirements Field is Required" }),
  }),
});

const updatePetProfile = z.object({
  body: z.object({
    name: z.string({ required_error: "Name Field is Required" }).optional(),
    species: z.string({ required_error: "Species Field is Required" }).optional(),
    breed: z.string({ required_error: "Breed Field is Required" }).optional(),
    age: z.number({ required_error: "Age Field is Required" }).optional(),
    size: z.string({ required_error: "Size Field is Required" }).optional(),
    location: z.string({ required_error: "Location Field is Required" }).optional(),
    description: z.string({ required_error: "Description Field is Required" }).optional(),
    temperament: z.string({ required_error: "Temperament Field is Required" }).optional(),
    medicalHistory: z.string({ required_error: "MedicalHistory Field is Required" }).optional(),
    adoptionRequirements: z
      .string({ required_error: "AdoptionRequirements Field is Required" })
      .optional(),
  }),
});

export const PetValidationSchemas = {
  addPet,
  updatePetProfile,
};
