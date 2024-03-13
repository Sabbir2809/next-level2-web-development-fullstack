import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { buyerPaths } from "./buyer.routes";
import { sellerPaths } from "./seller.routes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/seller",
    element: (
      <ProtectedRoute role="seller">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(sellerPaths),
  },
  {
    path: "/buyer",
    element: (
      <ProtectedRoute role="buyer">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(buyerPaths),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
