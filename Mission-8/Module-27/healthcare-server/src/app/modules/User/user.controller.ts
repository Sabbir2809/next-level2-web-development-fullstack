import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.createAdmin(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Created Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const UserControllers = {
  createAdmin,
};
