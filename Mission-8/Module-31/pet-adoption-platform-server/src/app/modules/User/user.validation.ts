import { z } from "zod";

const registration = z.object({
  body: z.object({
    name: z.string({ required_error: "Name Field is Required" }),
    email: z.string({ required_error: "Email Field is Required" }),
    password: z.string({ required_error: "Password Field is Required" }),
  }),
});

const updateUserProfile = z.object({
  body: z.object({
    name: z.string({ required_error: "Name Field is Required" }).optional(),
    email: z.string({ required_error: "Email Field is Required" }).optional(),
  }),
});

export const UserValidationSchemas = {
  registration,
  updateUserProfile,
};
