import { Request } from "express";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../utils/prisma";

const getAllSpecialtiesFormDB = async () => {
  const result = await prisma.specialties.findMany();
  return result;
};

const createSpecialtyIntoDB = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const deleteSpecialtyIntoDB = async (id: string) => {
  const specialtyData = await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.specialties.delete({
    where: {
      id: specialtyData.id,
    },
  });
  return result;
};

export const SpecialtiesServices = {
  createSpecialtyIntoDB,
  getAllSpecialtiesFormDB,
  deleteSpecialtyIntoDB,
};
