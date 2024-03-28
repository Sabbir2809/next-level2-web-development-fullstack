import { User } from "@prisma/client";
import prisma from "../../utils/prisma";

const createUserIntoDB = async (payload: any) => {
  const { password, user } = payload;

  const result = await prisma.user.create({
    data: {
      ...user,
      password,
    },
  });
  return result;
};

const getUsersFromDB = async (queryParams: any) => {
  const { searchTerm, page = 1, limit = 2, sortBy, sortOrder, ...otherQueryParams } = queryParams;
  const conditions = [];

  // search
  if (searchTerm) {
    conditions.push({
      OR: ["username", "email"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // other field
  if (Object.keys(otherQueryParams).length > 0) {
    const filterData = Object.keys(otherQueryParams).map((key) => ({
      [key]: otherQueryParams[key],
    }));
    conditions.push(...filterData);
  }

  const result = await prisma.user.findMany({
    where: { AND: conditions },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  return result;
};

const updateUserIntoDB = async (userId: string, updatedData: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updatedData,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
};
