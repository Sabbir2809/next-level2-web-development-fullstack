import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const interactiveTransaction = async () => {
  const result = await prisma.$transaction(async (transactionClient) => {
    // 1. query-1
    const getAllPosts = await transactionClient.post.findMany({
      where: {
        published: true,
      },
    });

    // 2. query-2
    const countUser = await transactionClient.user.count();

    // 3. query-3
    const updateUser = await transactionClient.user.update({
      where: {
        id: 5,
      },
      data: {
        age: 24,
      },
    });

    return {
      getAllPosts,
      countUser,
      updateUser,
    };
  });

  console.log(result);
};
interactiveTransaction();
