import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// single delete
const deletes = async () => {
  // 1. single delete()
  // const singleDelete = await prisma.post.delete({
  //   where: {
  //     id: 9,
  //   },
  // });
  // console.log(singleDelete);

  // 3. multiple deleteMany()
  const deleteMany = await prisma.post.deleteMany({
    where: {
      published: false,
    },
  });
  console.log(deleteMany);
};
deletes();
