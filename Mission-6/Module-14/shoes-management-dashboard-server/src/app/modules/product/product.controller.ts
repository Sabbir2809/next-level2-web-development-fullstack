import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

/**
 * Route: /products/create-product
 * Method: POST
 */
const createProduct = catchAsync(async (req, res) => {
  // service
  const result = await ProductServices.createProductIntoDB(req.body);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product is Created Successfully",
    data: result,
  });
});

/**
 * Route: /products
 * Method: GET
 */
const getAllProducts = catchAsync(async (req, res) => {
  // service
  const result = await ProductServices.getAllProductsFromDB(req.query);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Products Successfully",
    meta: result.meta,
    data: result.result,
  });
});

/**
 * Route: /products/:productId
 * Method: GET
 */
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  // service
  const result = await ProductServices.getSingleProductFromDB(productId);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Single Product Successfully",
    data: result,
  });
});

/**
 * Route: /products/verify/:productID
 * Method: GET
 */
const verifyProductID = catchAsync(async (req, res) => {
  const productID = req.params.productID;
  // service
  const result = await ProductServices.verifyProductIDFromDB(productID);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product verification Successfully",
    data: result,
  });
});

/**
 * Route: /products/:productId
 * Method: PATCH
 */
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  // service
  const result = await ProductServices.updateProductIntoDB(productId, req.body);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product Updated Successfully",
    data: result,
  });
});

/**
 * Route: /products/:productId
 * Method: DELETE
 */
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  // service
  await ProductServices.deleteProductIntoDB(productId);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is Deleted Successfully",
    data: null,
  });
});

/**
 * Route: /products
 * Method: DELETE
 */
const multipleDeleteProducts = catchAsync(async (req, res) => {
  const { productIds } = req.body;
  // service
  await ProductServices.multipleDeleteProductsIntoDB(productIds);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products is Deleted Successfully",
    data: null,
  });
});

/**
 * Route: /polish/polish-request-status/:polishId
 * Method: PUT
 */
const addToCart = catchAsync(async (req, res) => {
  const { userId } = (req as JwtPayload).user;
  // service
  const result = await ProductServices.addToCartIntoDB(userId, req.body);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Add To Cart Successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  verifyProductID,
  updateProduct,
  deleteProduct,
  multipleDeleteProducts,
  addToCart,
};
