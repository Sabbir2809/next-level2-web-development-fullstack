import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TCarts } from "../userAuth/userAuth.interface";
import { User } from "../userAuth/userAuth.model";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productSearchableFields = ["brand", "model"];
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const verifyProductIDFromDB = async (productID: string) => {
  const product = await Product.findOne({ productID });
  if (!product) {
    throw new AppError(404, "This productID is Not Found!");
  }
  const result = await Product.findOneAndUpdate({ productID }, { verified: true }, { new: true });
  return result;
};

const updateProductIntoDB = async (productId: string, payload: Partial<IProduct>) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new AppError(404, "This productID is Not Found!");
  }
  const result = await Product.findByIdAndUpdate({ _id: productId }, payload, { new: true });
  return result;
};

const deleteProductIntoDB = async (productId: string) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new AppError(404, "This productID is Not Found!");
  }
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const multipleDeleteProductsIntoDB = async (productIds: string[]) => {
  const result = await Product.deleteMany({ _id: { $in: productIds } });
  if (result.deletedCount === 0) {
    throw new AppError(400, "Product Id Not Found!");
  }
  return result;
};

const addToCartIntoDB = async (userId: string, payload: TCarts) => {
  const product = await Product.findOne({ _id: payload.productId });
  if (!product) {
    throw new AppError(404, "This productID is Not Found!");
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { carts: payload } },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  verifyProductIDFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
  multipleDeleteProductsIntoDB,
  addToCartIntoDB,
};
