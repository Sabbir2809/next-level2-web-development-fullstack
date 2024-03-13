import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { ISale } from "./sale.interface";
import { Sale } from "./sale.model";

const createSaleIntoDB = async (payload: ISale) => {
  const product = await Product.findById(payload.productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (payload.quantitySold > product.quantity) {
    throw new AppError(400, "Insufficient stock");
  }

  // Start a MongoDB transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create sale document
    const result = await Sale.create([payload], { session });

    // Update the product quantity and remove it if it reaches zero
    product.quantity -= payload.quantitySold;

    if (product.quantity <= 0) {
      await Product.findByIdAndDelete(payload.productId, { session });
    } else {
      await product.save({ session });
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(400, "Failed to update Product");
  }
};

const getSalesHistoryFromDB = async (salesPeriod: string) => {
  const now = new Date();
  const startDate = new Date(now);

  // Calculate the start date based on the requested salesPeriod
  switch (salesPeriod) {
    case "weekly":
      startDate.setDate(now.getDate() - 7);
      break;
    case "daily":
      startDate.setDate(now.getDate() - 1);
      break;
    case "monthly":
      startDate.setMonth(now.getMonth() - 1);
      break;
    case "yearly":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      throw new Error("Invalid period");
  }

  const sales = await Sale.find({
    saleDate: { $gte: startDate.toISOString() },
  }).populate({
    path: "productId",
    select: "name price brand color quantity releaseDate model style size",
  });

  return sales;
};

const getDashboardStatisticsFromDB = async () => {
  const totalSales = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$quantitySold" },
      },
    },
  ]);

  const totalRevenue = await Sale.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ["$quantitySold", "$product.price"] } },
      },
    },
  ]);

  return {
    totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0,
    totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
  };
};

export const SaleServices = {
  createSaleIntoDB,
  getSalesHistoryFromDB,
  getDashboardStatisticsFromDB,
};
