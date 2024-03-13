import { z } from "zod";

// Zod
const polishRequestValidationSchema = z.object({
  body: z.object({
    polishType: z.string({
      invalid_type_error: "polishType must be String",
      required_error: "polishType is Required",
    }),
    shineLevel: z.string({
      invalid_type_error: "shineLevel must be string",
      required_error: "shineLevel is Required",
    }),
    polishColor: z.string({
      invalid_type_error: "polishColor must be string",
      required_error: "polishColor is Required",
    }),
    numberOfPairs: z.string({
      invalid_type_error: "numberOfPairs must be string",
      required_error: "numberOfPairs is Required",
    }),
    instructions: z.string({
      invalid_type_error: "instructions must be string",
      required_error: "instructions is Required",
    }),
    status: z.enum(["Pending", "In-Progress", "Completed"]).default("Pending"),
    acceptedBySeller: z.boolean().default(false),
  }),
});

export const polishValidations = {
  polishRequestValidationSchema,
};
