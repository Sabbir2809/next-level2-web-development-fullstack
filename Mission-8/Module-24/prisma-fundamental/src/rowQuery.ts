import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rowQuery = async () => {
  const posts = await prisma.$queryRaw`SELECT * FROM posts`;
  console.log(posts);

  // delete users table data
  await prisma.$queryRaw`TRUNCATE TABLE "users" CASCADE`;
};
rowQuery();
