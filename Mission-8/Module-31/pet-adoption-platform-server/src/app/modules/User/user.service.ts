import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

const registrationIntoDB = async (payload: User) => {
  // password hashing
  const hashPassword: string = await bcrypt.hash(payload.password, 8);

  // create user
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getProfileInformationFromDB = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateUserInformationInto = async (
  userId: string,
  payload: { name: string; email: string }
) => {
  const { name, email } = payload;

  // check valid user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  // update user information
  const result = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UserServices = {
  registrationIntoDB,
  getProfileInformationFromDB,
  updateUserInformationInto,
};
