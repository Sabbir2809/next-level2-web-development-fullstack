import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SaleServices } from "./sale.service";

/**
 * Route: /sales/create-sell
 * Method: POST
 */
const createSale = catchAsync(async (req, res) => {
  // service
  const result = await SaleServices.createSaleIntoDB(req.body);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Sale is Created Successfully",
    data: result,
  });
});

/**
 * Route: /sales/:salesPeriod
 * Method: GET
 */
const getSalesHistory = catchAsync(async (req, res) => {
  const salesPeriod = req.params.salesPeriod;
  // service
  const result = await SaleServices.getSalesHistoryFromDB(salesPeriod);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Sale History Successfully",
    data: result,
  });
});

/**
 * Route: /sales/stats
 * Method: GET
 */
const getDashboardStatistics = catchAsync(async (req, res) => {
  // service
  const result = await SaleServices.getDashboardStatisticsFromDB();

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Dashboard Stats Successfully",
    data: result,
  });
});

export const SaleControllers = {
  createSale,
  getSalesHistory,
  getDashboardStatistics,
};
