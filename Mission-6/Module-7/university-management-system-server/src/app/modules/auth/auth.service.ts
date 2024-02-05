import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";
import User from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utlis";

const loginUser = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(404, "This User is Not Found!");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This User is Deleted");
  }

  // checking if the user is already blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This User is Blocked");
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(403, "Password do not Matched!");
  }

  // access: send accessToken, refreshToken
  // create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in_secret as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in_secret as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(404, "This User is Not Found!");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This User is Deleted");
  }

  // checking if the user is already blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This User is Blocked");
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(403, "Password do not Matched!");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    { password: newHashedPassword, needsPasswordChange: false, passwordChangeAt: new Date() }
  );
  return null;
};

const refreshToken = async (token: string) => {
  // check if the token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(404, "This User is Not Found!");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This User is Deleted");
  }

  // checking if the user is already blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This User is Blocked");
  }

  if (user.passwordChangeAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)) {
    throw new AppError(401, "You are not authorized!");
  }

  // Token Create
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in_secret as string
  );

  return { accessToken };
};

const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(404, "This User is Not Found!");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This User is Deleted");
  }

  // checking if the user is already blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This User is Blocked");
  }

  // Token Create
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, "10m");

  const resetUILink = `${config.rest_pass_ui_link}?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
};

const resetPassword = async (payload: { id: string; newPassword: string }, token: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(404, "This User is Not Found!");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(403, "This User is Deleted");
  }

  // checking if the user is already blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(403, "This User is Blocked");
  }

  // check if the token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  if (payload.id !== decoded.userId) {
    throw new AppError(403, "Your are Forbidden!");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    { password: newHashedPassword, needsPasswordChange: false, passwordChangeAt: new Date() }
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
