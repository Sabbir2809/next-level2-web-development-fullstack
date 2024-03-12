import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const batch = async () => {
  const createUser = prisma.user.create({
    data: {
      username: "salkin",
      email: "salkin@gmail.com",
    },
  });
  // console.log("create user: ", createUser);

  const updateUser = prisma.user.update({
    where: {
      id: 3,
    },
    data: {
      age: 25,
    },
  });
  // console.log("Update User: ", updateUser);

  const [userData, updateData] = await prisma.$transaction([createUser, updateUser]);
  console.log(userData, updateData);
};
batch();
