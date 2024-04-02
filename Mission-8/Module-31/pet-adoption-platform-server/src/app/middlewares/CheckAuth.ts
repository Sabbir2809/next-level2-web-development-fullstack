import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { verifyToken } from "../utils/JWT";
import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";

const checkAuth = () => {
  return catchAsync(
    async (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
      // Extract token from the request headers
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(401, "Unauthorized Access");
      }

      // check if the token is valid
      const decodedData = verifyToken(token, config.jwt.jwt_secret as Secret);

      // Check if the user exists in the database
      await prisma.user.findUniqueOrThrow({
        where: {
          id: decodedData.userId,
        },
      });

      // Set decoded data in req.user
      req.user = decodedData;
      // Call next middleware
      next();
    }
  );
};

export default checkAuth;
