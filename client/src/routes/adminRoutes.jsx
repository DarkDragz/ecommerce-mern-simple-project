import { AdminDashboard } from "@/pages/admin/dashboard";
import { AdminFeatures } from "@/pages/admin/features";
import { AdminOrders } from "@/pages/admin/orders";
import { AdminProducts } from "@/pages/admin/products";
import { adminRoutes } from "@/shared/routes";
import { Navigate } from "react-router-dom";

const adminationRoutes = [
  {
    path: "*",
    element: <Navigate to={adminRoutes.dashboard} replace />,
    index: true,
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

export default adminationRoutes;
