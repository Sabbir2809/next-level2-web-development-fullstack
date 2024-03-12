import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const filtering = async () => {
  // 1. AND[] filtering
  // const andFiltering = await prisma.post.findMany({
  //   where: {
  //     AND: [
  //       {
  //         title: {
  //           contains: "title",
  //         },
  //       },
  //       {
  //         published: true,
  //       },
  //     ],
  //   },
  // });
  // console.log(andFiltering);
  // 2. OR[] filtering
  // const orFiltering = await prisma.post.findMany({
  //   where: {
  //     OR: [
  //       {
  //         title: {
  //           contains: "title",
  //         },
  //       },
  //       {
  //         published: true,
  //       },
  //     ],
  //   },
  // });
  // console.log(orFiltering);
  // 3. NOT[] filtering
  // const notFiltering = await prisma.post.findMany({
  //   where: {
  //     NOT: [
  //       {
  //         title: {
  //           contains: "title",
  //         },
  //       },
  //     ],
  //   },
  // });
  // console.log(notFiltering);
  // 4. startsWith: "", endsWith: "" filtering
  // const withFiltering = await prisma.user.findMany({
  //   where: {
  //     email: {
  //       // contains: "gmail.com",
  //       // startsWith: "user2",
  //       // endsWith: "ums.com",
  //       equals: "user3@ums.com",
  //     },
  //   },
  // });
  // console.log(withFiltering);

  // 5. in: filtering
  // const userNameArray = ["User-1", "User-2"];
  // const inFiltering = await prisma.user.findMany({
  //   where: {
  //     username: {
  //       in: userNameArray,
  //     },
  //   },
  // });
  // console.log(inFiltering);

  // 6.
  const inDepthData = await prisma.user.findUnique({
    where: {
      id: 2,
    },
    include: {
      post: {
        include: {
          postCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
  console.log(inDepthData);
};
filtering();
