import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const getAllReviews = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["patientEmail", "doctorEmail"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewServices.getAllReviewsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Fetched Successfully",
    data: result,
  });
});

const createReview = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const result = await ReviewServices.createReviewIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review Created Successfully",
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
};
