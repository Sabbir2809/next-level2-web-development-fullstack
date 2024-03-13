import { z } from "zod";

// Zod
const createSaleValidationSchema = z.object({
  body: z.object({
    productId: z.string({
      invalid_type_error: "Sale name must be string",
      required_error: "name is Required",
    }),
    quantitySold: z
      .number({
        invalid_type_error: "Sale quantitySold must be number",
        required_error: "quantitySold is Required",
      })
      .positive(),
    buyerName: z.string({
      invalid_type_error: "Sale brand must be string",
      required_error: "releaseDate is Required",
    }),
    saleDate: z.string(),
  }),
});

export const SaleValidations = {
  createSaleValidationSchema,
};
