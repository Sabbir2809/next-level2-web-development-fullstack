import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Product from "../pages/Product";
import Register from "../pages/Register";
import Sale from "../pages/Sale";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "products-list",
        element: <Product />,
      },
      {
        path: "sales-history",
        element: <Sale />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
