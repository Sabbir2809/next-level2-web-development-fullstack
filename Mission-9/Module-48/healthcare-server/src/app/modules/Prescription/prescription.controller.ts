import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { PrescriptionServices } from "./prescription.service";

const createPrescription = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const result = await PrescriptionServices.createPrescriptionIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription Created Successfully",
    data: result,
  });
});

const getPatientPrescription = catchAsync(async (req, res) => {
  const user = (req as JwtPayload).user;
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PrescriptionServices.getPatientPrescriptionFormDB(user, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription Fetched Successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const PrescriptionControllers = {
  createPrescription,
  getPatientPrescription,
};
