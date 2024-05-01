import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../src/app/config";
import prisma from "../src/app/utils/prisma";

// super admin
const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super Admin Already Exits!");
      return;
    }

    const hashPassword = await bcrypt.hash(config.superAdmin.super_admin_password, 8);

    const superAdminData = await prisma.user.create({
      data: {
        email: config.superAdmin.super_admin_email,
        password: hashPassword,
        role: UserRole.SUER_ADMIN,
        admin: {
          create: {
            name: config.superAdmin.super_admin_name,
            contactNumber: config.superAdmin.super_admin_contactNumber,
          },
        },
      },
    });
    console.log("Super Admin Created Successfully", superAdminData);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
seedSuperAdmin();
