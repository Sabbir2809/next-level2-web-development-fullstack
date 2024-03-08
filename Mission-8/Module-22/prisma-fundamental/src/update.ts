import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = async () => {
  // 1. single update()
  // const singleUpdate = await prisma.post.update({
  //   where: {
  //     id: 9,
  //   },
  //   data: {
  //     title: "Title-9",
  //     content: "Content-9",
  //   },
  // });
  // console.log(singleUpdate);

  // 2. multiple updateMany()
  // const updateMany = await prisma.post.updateMany({
  //   where: {
  //     title: "Title-2",
  //   },
  //   data: {
  //     published: true,
  //     authorName: "Sabbir",
  //   },
  // });
  // console.log(updateMany);

  // 3. upsert()
  const upsertData = await prisma.post.upsert({
    where: {
      id: 12,
    },
    update: {
      authorName: "Sabbir",
    },
    create: {
      title: "Title-1",
      content: "Content-1",
    },
  });
  console.log(upsertData);
};
updates();
