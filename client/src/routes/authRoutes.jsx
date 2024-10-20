import { AdminDashboard } from "@/pages/admin/dashboard";
import { AdminFeatures } from "@/pages/admin/features";
import { AdminOrders } from "@/pages/admin/orders";
import { AdminProducts } from "@/pages/admin/products";
import AuthLogin from "@/pages/auth/login";
import AuthRegister from "@/pages/auth/register";
import { adminRoutes, routes } from "@/shared/routes";
import { Navigate } from "react-router-dom";

//routes from where you go towards authentication
const authenticationRoutes = [
  { path: "*", element: <Navigate to={routes.login} replace />, index: true },
  {
    path: routes.login,
    element: <AuthLogin />,
  },
  {
    path: routes.register,
    element: <AuthRegister />,
  },
  {
    path: adminRoutes.dashboard,
    element: <AdminDashboard />,
  },
  {
    path: adminRoutes.features,
    element: <AdminFeatures />,
  },
  {
    path: adminRoutes.orders,
    element: <AdminOrders />,
  },
  {
    path: adminRoutes.products,
    element: <AdminProducts />,
  },
];

export default authenticationRoutes;
