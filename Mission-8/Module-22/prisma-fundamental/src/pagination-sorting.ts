import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paginationSorting = async () => {
  // 1. offset pagination
  // const offsetData = await prisma.post.findMany({
  //   skip: 5,
  //   take: 2,
  // });
  // console.log(offsetData);

  // 2. cursor pagination
  const cursorData = await prisma.post.findMany({
    skip: 5,
    take: 2,
    cursor: {
      id: 15,
    },
  });
  console.log(cursorData);

  // 3. sorting
  const sortedData = await prisma.post.findMany({
    orderBy: {
      title: "desc",
    },
    skip: 2,
    take: 5,
  });
  console.log(sortedData);
};

paginationSorting();
