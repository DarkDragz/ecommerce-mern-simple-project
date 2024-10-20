/* eslint-disable react/prop-types */
import { adminRoutes, routes, shoppingRoutes } from "@/shared/routes";
import { Navigate, useLocation } from "react-router-dom";
import { UserTypes } from "../../shared/constants";

export const CheckAuth = ({ isAuthenticated, userType, children }) => {
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes(routes.login) ||
      location.pathname.includes(routes.register)
    )
  ) {
    return <Navigate to={routes.login} />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes(routes.login) ||
      location.pathname.includes(routes.register))
  ) {
    return (
      <Navigate
        to={
          userType === UserTypes.ADMIN
            ? adminRoutes.dashboard
            : shoppingRoutes.home
        }
      />
    );
  }
  return <>{children}</>;
};
