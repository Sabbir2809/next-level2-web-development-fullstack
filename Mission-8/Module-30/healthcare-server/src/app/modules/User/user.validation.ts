import { z } from "zod";

const createAdmin = z.object({
  password: z.string({ required_error: "Password is Required" }),
  admin: z.object({
    name: z.string({ required_error: "name is Required" }),
    email: z.string({ required_error: "email is Required" }),
    contactNumber: z.string({ required_error: "contactNumber is Required" }),
  }),
});

export const UserValidationSchemes = {
  createAdmin,
};
