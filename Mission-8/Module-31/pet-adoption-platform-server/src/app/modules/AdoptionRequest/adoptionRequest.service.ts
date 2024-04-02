import { Status } from "@prisma/client";
import prisma from "../../utils/prisma";

const getAllAdoptionRequestsFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany();
  return result;
};

const submitAdoptionRequestIntoDB = async (
  userId: string,
  payload: {
    petId: string;
    petOwnershipExperience: string;
  }
) => {
  const result = await prisma.adoptionRequest.create({
    data: {
      ...payload,
      userId,
    },
  });
  return result;
};

const updateAdoptionRequestStatusIntoDB = async (requestId: string, status: Status) => {
  const result = await prisma.adoptionRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status: status,
    },
  });
  return result;
};

export const AdoptionRequestServices = {
  submitAdoptionRequestIntoDB,
  getAllAdoptionRequestsFromDB,
  updateAdoptionRequestStatusIntoDB,
};
