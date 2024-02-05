import { Schema, model } from "mongoose";
import { IUser } from "./userAuth.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true, versionKey: false }
);

// middleware hook: password hide
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<IUser>("User", userSchema);
