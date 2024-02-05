import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";
const router = express.Router();

// create Product
router.post(
  "/create-product",
  checkAuth(),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);
// read product
router.get("/", checkAuth(), ProductControllers.getAllProducts);
router.get("/:productId", checkAuth(), ProductControllers.getSingleProduct);
// update Product
router.patch(
  "/:productId",
  checkAuth(),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct
);
// delete Product
router.delete("/:productId", checkAuth(), ProductControllers.deleteProduct);

export const ProductRoutes = router;
