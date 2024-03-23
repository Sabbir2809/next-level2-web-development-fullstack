import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

const createAdmin = async (data: any) => {
  const hashPassword: string = await bcrypt.hash(data.password, 8);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  // transaction and roll back
  const result = await prisma.$transaction(async (transactionClient) => {
    // user
    await transactionClient.user.create({
      data: userData,
    });

    // admin
    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });
  return result;
};

export const UserServices = {
  createAdmin,
};
