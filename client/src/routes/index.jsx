import { AuthLayout } from "@/components/auth/layout";
import authenticationRoutes from "./authRoutes";
import { useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { routes } from "@/shared/routes";
import { AdminLayout } from "@/components/admin/layout";
import adminationRoutes from "./adminRoutes";
import { ShoppingLayout } from "@/components/shopping/layout";
import shopRoutes from "./shoppingRoutes";
import { useSelector } from "react-redux";
import {
  isAuthenticatedSelector,
  userTypeSelector,
} from "../store/selectors/authSelector";
import { UserTypes } from "../shared/constants";

const unAuthenticatedRoutes = {
  element: <AuthLayout />,
  children: authenticationRoutes,
};
const adminRoutes = {
  element: <AdminLayout />,
  children: adminationRoutes,
};
const shoppingRoutes = {
  element: <ShoppingLayout />,
  children: shopRoutes,
};
export const Router = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const userType = useSelector(userTypeSelector);
  const accessibleRoutes = useMemo(() => {
    if (isAuthenticated) {
      return userType === UserTypes.ADMIN ? adminRoutes : shoppingRoutes;
    }

    return unAuthenticatedRoutes;
  }, [isAuthenticated, userType]);
  return useRoutes([
    {
      element: <Navigate to={routes.home} replace />,
      children: [
        {
          path: "*",
          element: <Navigate to={routes.home} replace />,
        },
      ],
    },
    accessibleRoutes,
  ]);
};
