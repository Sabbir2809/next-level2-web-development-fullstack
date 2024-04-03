import { Admin, Doctor, Patient, Prisma, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { TFile } from "../../types/cloudinary";
import { TPaginationOptions } from "../../types/pagination";
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

const getMyProfileFromDB = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  let profileInfo;
  if (userData.role === UserRole.SUER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userData.email,
      },
    });
  }

  return {
    ...userData,
    ...profileInfo,
  };
};

const updateMyProfileIntoDB = async (user: JwtPayload, req: Request) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }

  let profileUpdateInfo;
  if (userData.role === UserRole.SUER_ADMIN) {
    profileUpdateInfo = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData.role === UserRole.ADMIN) {
    profileUpdateInfo = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData.role === UserRole.DOCTOR) {
    profileUpdateInfo = await prisma.doctor.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData.role === UserRole.PATIENT) {
    profileUpdateInfo = await prisma.patient.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  }

  return {
    ...profileUpdateInfo,
  };
};

export const UserServices = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatusIntoDB,
  getMyProfileFromDB,
  updateMyProfileIntoDB,
};
