import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "Something went wrong",
      error: error,
    });
  }
};

export const UserControllers = {
  createAdmin,
};
