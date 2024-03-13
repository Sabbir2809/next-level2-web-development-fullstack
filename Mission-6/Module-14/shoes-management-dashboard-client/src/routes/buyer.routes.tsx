import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import PolishRequest from "../pages/buyer/PolishRequest";
import Product from "../pages/buyer/Product";
import VerifyProduct from "../pages/buyer/VerifyProduct";

export const buyerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <BuyerDashboard />,
  },
  {
    name: "Products",
    path: "products",
    element: <Product />,
  },
  {
    path: "verify/:productID",
    element: <VerifyProduct />,
  },
  {
    name: "Polish Request",
    path: "create-polish-request",
    element: <PolishRequest />,
  },
];
