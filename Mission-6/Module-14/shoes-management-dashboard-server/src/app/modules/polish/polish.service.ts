import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../userAuth/userAuth.model";
import { IPolish } from "./polish.interface";
import { Polish } from "./polish.modal";

const createPolishRequestIntoDB = async (userId: string, payload: IPolish) => {
  const session = await mongoose.startSession();

  try {
    // 1. Start the transaction
    session.startTransaction();

    // 2. Create the Polish request (transaction-1)
    const result = await Polish.create([{ ...payload, userId: userId }], { session });

    // Update the User document with the newly created Polish request ID (transaction-2)
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { polishServices: { $each: result.map((polish) => ({ polishId: polish._id })) } } },
      {
        new: true,
        runValidators: true,
        session: session,
      }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, "Failed to Polish Service Created");
  }
};

const getAllPolishRequestsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Polish.find().populate("userId"), query)
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

const updatePolishRequestStatusIntoDB = async (polishId: string, payload: { status: string }) => {
  const polishData = await Polish.findOne({ _id: polishId });
  if (!polishData) {
    throw new AppError(404, "Polish Request Data Not Found!");
  }

  const result = await Polish.findByIdAndUpdate(polishId, payload, { new: true, runValidators: true });

  return result;
};

export const PolishServices = {
  createPolishRequestIntoDB,
  getAllPolishRequestsFromDB,
  updatePolishRequestStatusIntoDB,
};
