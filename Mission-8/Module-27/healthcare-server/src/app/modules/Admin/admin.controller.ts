import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { adminFilterableFields } from "./admin.constant";
import { AdminServices } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    next(error);
  }
};

const getIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.getIdFromDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Fetched by Id",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.updateIntoDB(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const permanentDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.permanentDeleteFromDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.softDeleteFromDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const AdminControllers = {
  getAllFromDB,
  getIdFromDB,
  updateIntoDB,
  permanentDeleteFromDB,
  softDeleteFromDB,
};
