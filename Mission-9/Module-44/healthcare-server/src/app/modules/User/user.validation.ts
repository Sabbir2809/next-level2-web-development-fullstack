import { Gender, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
  password: z.string({ required_error: "Password is Required" }),
  admin: z.object({
    name: z.string({ required_error: "name is Required" }),
    email: z.string({ required_error: "email is Required" }),
    contactNumber: z.string({ required_error: "contactNumber is Required" }),
  }),
});

const createDoctor = z.object({
  password: z.string({ required_error: "Password is Required" }),
  doctor: z.object({
    name: z.string({ required_error: "name is Required" }),
    email: z.string({ required_error: "email is Required" }),
    contactNumber: z.string({ required_error: "contactNumber is Required" }),
    address: z.string({ required_error: "address is Required" }).optional(),
    registrationNumber: z.string({ required_error: "registrationNumber is Required" }),
    experience: z.number({ required_error: "experience is Required" }).optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({ required_error: "appointmentFee is Required" }),
    qualification: z.string({ required_error: "qualification is Required" }),
    currentWorkingPlace: z.string({ required_error: "currentWorkingPlace is Required" }),
    designation: z.string({ required_error: "designation is Required" }),
  }),
});

const createPatient = z.object({
  password: z.string({ required_error: "Password is Required" }),
  patient: z.object({
    name: z.string({ required_error: "name is Required" }),
    email: z.string({ required_error: "email is Required" }),
    contactNumber: z.string({ required_error: "contactNumber is Required" }),
  }),
});

const changeProfileStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const UserValidationSchemes = {
  createAdmin,
  createDoctor,
  createPatient,
  changeProfileStatus,
};
