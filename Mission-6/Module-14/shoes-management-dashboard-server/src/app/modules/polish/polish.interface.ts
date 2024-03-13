import { Types } from "mongoose";

export interface IPolish {
  userId: Types.ObjectId;
  polishType: string;
  shineLevel: string;
  polishColor: string;
  numberOfPairs: string;
  instructions: string;
  status: "Pending" | "In-Progress" | "Completed";
  acceptedBySeller: boolean;
}
