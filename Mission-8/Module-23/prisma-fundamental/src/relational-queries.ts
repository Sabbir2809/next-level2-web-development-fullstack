import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const relationalQueries = async () => {
  // 1. fluent api
  // const result = await prisma.user
  //   .findUnique({
  //     where: {
  //       id: 2,
  //     },
  //     // include: {
  //     //   post: true,
  //     // },
  //   })
  //   .profile();
  // console.log(result);

  // 2. relational filters
  const publishedPostUsers = await prisma.user.findMany({
    include: {
      post: {
        where: {
          published: true,
        },
      },
    },
  });
  console.dir(publishedPostUsers, { depth: Infinity });
};

relationalQueries();
