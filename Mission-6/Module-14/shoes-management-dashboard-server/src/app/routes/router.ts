import { Router } from "express";
import { PolishRoutes } from "../modules/polish/polish.route";
import { ProductRoutes } from "../modules/product/product.route";
import { SaleRoutes } from "../modules/sale/sale.route";
import { UserAuthRoutes } from "../modules/userAuth/userAuth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserAuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/sales",
    route: SaleRoutes,
  },
  {
    path: "/polish",
    route: PolishRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
