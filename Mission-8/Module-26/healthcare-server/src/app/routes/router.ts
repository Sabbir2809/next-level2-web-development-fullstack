import { Router } from "express";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { UserRoutes } from "../modules/User/user.route";
const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
