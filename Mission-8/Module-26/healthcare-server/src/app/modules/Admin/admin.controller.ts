import { Request, Response } from "express";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminServices } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllFromDB(filters, options);

    res.status(200).json({
      success: true,
      message: "Admins Data Fetched",
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

export const AdminControllers = {
  getAllFromDB,
};
