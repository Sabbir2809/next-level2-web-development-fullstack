import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // 1. create user
  // const createUser = await prisma.user.create({
  //   data: {
  //     username: "User-3",
  //     email: "user3@gmail.com",
  //     role: UserRole.user,
  //   },
  // });
  // console.log(createUser);

  // 2. create profile
  // const createProfile = await prisma.profile.create({
  //   data: {
  //     bio: "This is bio... user-1",
  //     userId: 2,
  //   },
  // });
  // console.log(createProfile);

  // 3. create category
  // const createCategory = await prisma.category.create({
  //   data: {
  //     name: "Web Development",
  //   },
  // });
  // console.log(createCategory);

  // 4. create post
  const createPost = await prisma.post.create({
    data: {
      title: "this is title-2",
      content: "this is content this title",
      authorId: 1,
      postCategory: {
        // create: {
        //   // category: {
        //   //   connect: {
        //   //     id: 1,
        //   //   },
        //   // },
        //   categoryId: 2,
        // },
        create: [
          {
            categoryId: 1,
          },
          {
            categoryId: 2,
          },
        ],
      },
    },
    include: {
      postCategory: true,
    },
  });
  console.log(createPost);
};

main();
