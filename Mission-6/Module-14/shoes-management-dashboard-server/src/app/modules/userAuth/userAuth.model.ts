import { Schema, model } from "mongoose";
import { IUser, TCarts, TPolishServices } from "./userAuth.interface";

const polishServiceSchema = new Schema<TPolishServices>(
  {
    polishId: { type: Schema.Types.ObjectId, ref: "Polish" },
  },
  { timestamps: false, versionKey: false }
);

const cartSchema = new Schema<TCarts>(
  {
    productColor: { type: String, required: true },
    productSize: { type: String, required: true },
    productQuantity: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: false, versionKey: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "buyer" },
    polishServices: { type: [polishServiceSchema] },
    carts: { type: [cartSchema] },
  },
  { timestamps: true, versionKey: false }
);

// middleware hook: password hide
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<IUser>("User", userSchema);
