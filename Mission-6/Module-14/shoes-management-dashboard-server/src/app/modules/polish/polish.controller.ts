import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PolishServices } from "./polish.service";

/**
 * Route: /polish/polish-request
 * Method: POST
 */
const createPolishRequest = catchAsync(async (req, res) => {
  const { userId } = (req as JwtPayload).user;
  // service
  const result = await PolishServices.createPolishRequestIntoDB(userId, req.body);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Polish Request is Created Successfully",
    data: result,
  });
});

/**
 * Route: /polish/polish-requests
 * Method: GET
 */
const getAllPolishRequests = catchAsync(async (req, res) => {
  // service
  const result = await PolishServices.getAllPolishRequestsFromDB(req.query);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All Polish Request Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

/**
 * Route: /polish/polish-request-status/:polishId
 * Method: PUT
 */
const updatePolishRequestStatus = catchAsync(async (req, res) => {
  const { polishId } = req.params;
  // service
  const result = await PolishServices.updatePolishRequestStatusIntoDB(polishId, req.body);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Status Update Successfully",
    data: result,
  });
});

export const PolishControllers = {
  createPolishRequest,
  getAllPolishRequests,
  updatePolishRequestStatus,
};
