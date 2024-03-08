import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // 1. findMany()
  const getAllFromDB = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      authorName: true,
    },
  });
  console.log(getAllFromDB);
  // 2. findFirstOrThrow()
  // const findFirst = await prisma.post.findFirstOrThrow({
  //   where: {
  //     published: false,
  //   },
  // });
  // console.log({ findFirst });
  // 3. findUniqueOrThrow()
  // const findUnique = await prisma.post.findUniqueOrThrow({
  //   where: {
  //     id: 12,
  //   },
  //   select: {
  //     title: true,
  //     content: true,
  //     authorName: true,
  //   },
  // });
  // console.log({ findUnique });
};

main();
