import { z } from "zod";

// user Registration Validation Schema
const userRegistrationValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
      required_error: "name is Required",
    }),
    email: z.string({
      invalid_type_error: "email must be string",
      required_error: "email is Required",
    }),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required",
      })
      .refine(
        (password) => {
          // At least 4 characters
          return /^.{4,}$/g.test(password);
        },
        {
          message: "Password must be at least 4 characters long",
        }
      ),
  }),
});

// user login Validation Schema
const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: "email must be string",
      required_error: "email is Required",
    }),
    password: z.string({
      invalid_type_error: "password must be string",
      required_error: "password is Required",
    }),
  }),
});

// user refresh Token Validation Schema
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is Required",
    }),
  }),
});

export const UserValidations = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
  refreshTokenValidationSchema,
};
