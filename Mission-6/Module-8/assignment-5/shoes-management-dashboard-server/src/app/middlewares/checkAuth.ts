/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AuthError from "../errors/AuthError";
import { User } from "../modules/userAuth/userAuth.model";
import { verifyToken } from "../modules/userAuth/userAuth.utils";
import catchAsync from "../utils/catchAsync";

const checkAuth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // headers token
    const token = req.headers.authorization;
    if (!token) {
      throw new AuthError(401, "No JWT is provided in the request headers");
    }

    // check if the token is valid
    let decodedToken;
    try {
      decodedToken = verifyToken(token, config.jwt_access_secret as string);
    } catch (error) {
      throw new AuthError(401, "Unauthorized!");
    }

    // decoded token
    const { userId, iat } = decodedToken as JwtPayload;

    // Authentication
    const user = await User.findById(userId);
    if (!user) {
      throw new AuthError(
        401,
        "The user does not possess the required permissions for the requested action or resource."
      );
    }

    // Expired date
    if (!iat) {
      throw new AuthError(401, "The provided JWT (JSON Web Token) has expired.");
    }

    // decoded
    (req as any).user = decodedToken as JwtPayload;
    next();
  });
};

export default checkAuth;
