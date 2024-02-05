import { Schema, model } from "mongoose";
import { ISale } from "./sale.interface";

const saleSchema = new Schema<ISale>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantitySold: { type: Number, required: true },
    buyerName: { type: String, required: true },
    saleDate: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Sale = model<ISale>("Sale", saleSchema);
