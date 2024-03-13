import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";
const router = express.Router();

// create Product
router.post(
  "/create-product",
  checkAuth("seller"),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);

// read product
router.get("/", checkAuth("seller", "buyer"), ProductControllers.getAllProducts);
router.get("/:productId", checkAuth("seller", "buyer"), ProductControllers.getSingleProduct);
router.get("/verify/:productID", checkAuth("seller", "buyer"), ProductControllers.verifyProductID);

// update Product
router.patch(
  "/:productId",
  checkAuth("seller"),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct
);
router.put("/add-to-cart", checkAuth("buyer"), ProductControllers.addToCart);

// delete Product
router.delete("/:productId", checkAuth("seller"), ProductControllers.deleteProduct);
router.delete("/", checkAuth("seller"), ProductControllers.multipleDeleteProducts);

export const ProductRoutes = router;
