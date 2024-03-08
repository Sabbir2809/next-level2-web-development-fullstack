import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // 1. create single
  // const result = await prisma.post.create({
  //   data: {
  //     title: "title-1",
  //     content: "Content-2",
  //   },
  // });
  // console.log(result);

  // 2. create multiple
  const createMany = await prisma.post.createMany({
    data: [
      {
        title: "title-2",
        content: "Content-2",
        authorName: "Author-2",
      },
      {
        title: "title-3",
        content: "Content-3",
        authorName: "Author-3",
      },
      {
        title: "title-4",
        content: "Content-4",
        authorName: "Author-4",
      },
    ],
  });
  console.log(createMany);
};

main();
