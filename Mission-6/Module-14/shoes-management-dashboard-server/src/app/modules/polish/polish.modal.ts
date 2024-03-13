import { Schema, model } from "mongoose";
import { IPolish } from "./polish.interface";

const polishService = new Schema<IPolish>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    polishType: { type: String, required: true },
    shineLevel: { type: String, required: true },
    polishColor: { type: String, required: true },
    numberOfPairs: { type: String, required: true },
    instructions: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In-Progress", "Completed"], default: "Pending" },
    acceptedBySeller: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Polish = model<IPolish>("Polish", polishService);
