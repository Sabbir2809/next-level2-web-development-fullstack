import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { TFile } from "../../types/cloudinary.type";
import { TPaginationOptions } from "../../types/pagination.type";
import { fileUploader } from "../../utils/fileUploader";
import calculatePagination from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { userSearchAbleFields } from "./user.constant";

const createAdmin = async (req: Request): Promise<Admin> => {
  const { password, admin } = req.body;

  // image upload to cloudinary
  const file = req.file as TFile;
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

const createDoctor = async (req: Request): Promise<Doctor> => {
  const { password, doctor } = req.body;

  // image upload to cloudinary
  const file = req.file as TFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // hash password
  const hashPassword: string = await bcrypt.hash(password, 8);

  // user data
  const userData = {
    email: doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  // transaction and roll back
  const result = await prisma.$transaction(async (transactionClient) => {
    // user create
    await transactionClient.user.create({
      data: userData,
    });

    // doctor create
    const createdDoctorData = await transactionClient.doctor.create({
      data: doctor,
    });
    console.log(createdDoctorData);

    return createdDoctorData;
  });
  return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
  const { password, patient } = req.body;

  // image upload to cloudinary
  const file = req.file as TFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    patient.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // hash password
  const hashPassword: string = await bcrypt.hash(password, 8);

  // user data
  const userData = {
    email: patient.email,
    password: hashPassword,
    role: UserRole.PATIENT,
  };

  // transaction and roll back
  const result = await prisma.$transaction(async (transactionClient) => {
    // user create
    await transactionClient.user.create({
      data: userData,
    });

    // patient data
    const createdPatientData = await transactionClient.patient.create({
      data: patient,
    });

    return createdPatientData;
  });
  return result;
};

const getAllFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];

  // only searchTerm
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  // specific field
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      // Relational Data: admin, doctor, patient
      admin: true,
      doctor: true,
      patient: true,
    },
    // Relational Data
    // include:{
    //   admin: true,
    //   doctor: true,
    //   patient: true,
    // }
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeProfileStatusIntoDB = async (id: string, status: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updateUserStatus;
};

export const UserServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatusIntoDB,
};
