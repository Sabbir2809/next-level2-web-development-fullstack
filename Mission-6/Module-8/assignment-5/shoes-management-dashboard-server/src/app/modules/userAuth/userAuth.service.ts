import config from "../../config";
import AppError from "../../errors/AppError";
import { ILogin, IUser } from "./userAuth.interface";
import { User } from "./userAuth.model";
import { comparePassword, createToken, hashPassword, verifyToken } from "./userAuth.utils";

const userRegistration = async (payload: IUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(403, "This User is Already Exists!");
  }

  // Hashing Password before store user data
  const hashedPassword = await hashPassword(payload.password);

  // user data save into db
  const result = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return result;
};

const userLogin = async (payload: ILogin) => {
  const { email, password } = payload;

  // checking if the user is exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(403, "Oops! Access denied. User profile not found.");
  }

  // checking if the password is correct
  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) {
    throw new AppError(403, "Password do not Matched!");
  }

  // create JWT token and sent to the client
  const jwtPayload = {
    userId: user.id,
    email: user.email,
  };
  // access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in_secret as string
  );
  // refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in_secret as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(403, "Oops! Access denied. User profile not found.");
  }

  // Token Create payload
  const jwtPayload = {
    userId: user.id,
    email: user.email,
  };

  // access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in_secret as string
  );

  return { accessToken };
};

export const UserAuthServices = {
  userRegistration,
  userLogin,
  refreshToken,
};
