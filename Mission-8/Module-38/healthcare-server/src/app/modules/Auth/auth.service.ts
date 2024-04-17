import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import emailSender from "../../utils/emailSender";
import { generateToken, verifyToken } from "../../utils/jwt";
import prisma from "../../utils/prisma";

const login = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

  if (!isCorrectPassword) {
    throw new Error("Password Incorrect!");
  }

  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  );
  const refreshToken = generateToken(
    jwtPayload,
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, "health-care");
  } catch (error) {
    throw new Error("Your are not Authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);
  if (!isCorrectPassword) {
    throw new Error("Password Incorrect!");
  }

  const hashPassword: string = await bcrypt.hash(payload.newPassword, 8);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password Changed Successfully",
  };
};

const forgetPassword = async (email: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
      status: UserStatus.ACTIVE,
    },
  });

  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };
  const resetPasswordToken = generateToken(
    jwtPayload,
    config.jwt.reset_password_secret as Secret,
    config.jwt.reset_expires_in as string
  );
  const resetPasswordLink = `${config.reset_password_link}?userId=${userData.id}&token=${resetPasswordToken}`;

  await emailSender(
    userData.email,
    `<div>
      <p>Dear User,</p>
      <p>Your Password Reset Link: 
        <a href=${resetPasswordLink} target="_blank">
          <button>Reset Password</button>
        </a> 
      </p>
    </div>`
  );
};

const resetPassword = async (token: string, payload: { id: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = verifyToken(token, config.jwt.reset_password_secret as Secret);
  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }

  const hashPassword: string = await bcrypt.hash(payload.password, 8);

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashPassword,
    },
  });
};

export const AuthServices = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
