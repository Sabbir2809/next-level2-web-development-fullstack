import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../config";
import ApiError from "../errors/ApiError";
import { verifyToken } from "../utils/jwt";

const checkAuth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Your are not Authorized!");
      }
      const decodedData = verifyToken(token, config.jwt.jwt_secret as Secret);

      if (roles.length && !roles.includes(decodedData.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkAuth;
