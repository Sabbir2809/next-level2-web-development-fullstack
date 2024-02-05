import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    style: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const Product = model<IProduct>("Product", productSchema);
