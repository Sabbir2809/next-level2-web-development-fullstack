import mongoose from "mongoose";

export interface ISale {
  productId: mongoose.Types.ObjectId;
  quantitySold: number;
  buyerName: string;
  saleDate: string;
}
