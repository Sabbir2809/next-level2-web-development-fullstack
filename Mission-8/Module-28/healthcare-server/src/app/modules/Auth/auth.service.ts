import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
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
  const accessToken = generateToken(jwtPayload, "healthcare", "5m");
  const refreshToken = generateToken(jwtPayload, "health-care", "30d");

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
  const accessToken = generateToken(jwtPayload, "healthcare", "30d");

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  login,
  refreshToken,
};
