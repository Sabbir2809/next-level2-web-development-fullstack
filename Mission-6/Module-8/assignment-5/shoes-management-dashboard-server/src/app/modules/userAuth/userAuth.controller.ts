import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserAuthServices } from "./userAuth.service";

/**
 * Route: /auth/register
 * Method: POST
 */
const userRegistration = catchAsync(async (req, res) => {
  // service
  const result = await UserAuthServices.userRegistration(req.body);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

/**
 * Route: /auth/login
 * Method: POST
 */
const userLogin = catchAsync(async (req, res) => {
  // service
  const result = await UserAuthServices.userLogin(req.body);
  const { refreshToken, accessToken } = result;

  // cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_DEV === "production",
    httpOnly: true,
  });

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successful",
    data: { accessToken },
  });
});

/**
 * Route: /auth/refresh-token
 * Method: POST
 */
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // service
  const result = await UserAuthServices.refreshToken(refreshToken);

  // send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Access token is retrieved Successfully",
    data: result,
  });
});

export const UserAuthControllers = {
  userRegistration,
  userLogin,
  refreshToken,
};
