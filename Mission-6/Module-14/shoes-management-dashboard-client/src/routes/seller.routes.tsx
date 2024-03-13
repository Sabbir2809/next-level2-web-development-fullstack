import PolishService from "../pages/seller/PolishService";
import SalesHistory from "../pages/seller/sales/SalesHistory";
import SellerDashboard from "../pages/seller/SellerDashboard";
import AddShoes from "../pages/seller/shoes/AddShoes";
import CreateVariant from "../pages/seller/shoes/CreateVariant";
import ProductTable from "../pages/seller/shoes/ProductTable";

export const sellerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <SellerDashboard />,
  },
  {
    name: "Shoes Management",
    children: [
      {
        name: "Add Shoes",
        path: "add-shoes",
        element: <AddShoes />,
      },
      {
        name: "Products",
        path: "products",
        element: <ProductTable />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
      {
        path: "create-variant",
        element: <CreateVariant />,
      },
    ],
  },
  {
    name: "Polish Service",
    path: "polish-service",
    element: <PolishService />,
  },
];
