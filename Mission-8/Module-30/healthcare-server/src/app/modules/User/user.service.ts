import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { TFile } from "../../types/cloudinary.type";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../utils/prisma";

const createAdmin = async (req: any) => {
  const { password, admin } = req.body;

  // image upload to cloudinary
  const file: TFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // hash password
  const hashPassword: string = await bcrypt.hash(password, 8);

  // user data
  const userData = {
    email: admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  // transaction and roll back
  const result = await prisma.$transaction(async (transactionClient) => {
    // user create
    await transactionClient.user.create({
      data: userData,
    });

    // admin data
    const createdAdminData = await transactionClient.admin.create({
      data: admin,
    });

    return createdAdminData;
  });
  return result;
};

export const UserServices = {
  createAdmin,
};
