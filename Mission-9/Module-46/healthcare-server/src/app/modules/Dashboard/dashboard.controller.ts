import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardServices } from "./dashboard.service";

const dashboardMetadata = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const result = await DashboardServices.dashboardMetadataFromDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard Metadata Fetched Successfully!",
    data: result,
  });
});

export const DashboardControllers = {
  dashboardMetadata,
};
