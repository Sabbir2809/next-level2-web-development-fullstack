import { Request, Response } from "express";
import catchAsync from "../../utils/CatchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.json({
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsersFromDB(req.query);

  res.json({
    success: true,
    message: "All Users Fetched Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getSingleUserFromDB(req.params.userId);

  res.json({
    success: true,
    message: "Fetched Single User Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserIntoDB(req.params.userId, req.body);

  res.json({
    success: true,
    message: "User Data Successfully Updated",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
};
