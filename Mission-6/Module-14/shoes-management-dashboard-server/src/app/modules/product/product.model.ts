import { Schema, model } from "mongoose";
import ShortUniqueId from "short-unique-id";
import { IProduct } from "./product.interface";

const { randomUUID } = new ShortUniqueId({ length: 6 });

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
    productID: { type: String, default: () => randomUUID(), unique: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Product = model<IProduct>("Product", productSchema);
