import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const aggregates = async () => {
  // const count = await prisma.user.count();
  // console.log(count);

  const result = await prisma.user.aggregate({
    // 1. average
    _avg: {
      age: true,
    },
    // 2. count
    _count: {
      age: true,
    },
    // 3. sum
    _sum: {
      age: true,
    },
    // 4. max
    _max: {
      age: true,
    },
    // 5. min
    _min: {
      age: true,
    },
  });
  console.log(result);
};
aggregates();
