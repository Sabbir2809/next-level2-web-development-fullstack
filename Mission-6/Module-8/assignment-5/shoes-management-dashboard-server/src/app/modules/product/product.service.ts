import QueryBuilder from "../../builder/QueryBuilder";
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

const updateProductIntoDB = async (productId: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate({ _id: productId }, payload, { new: true });
  return result;
};

const deleteProductIntoDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
