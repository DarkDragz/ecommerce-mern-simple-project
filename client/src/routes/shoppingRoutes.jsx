import { ShoppingAccount } from "@/pages/shopping/account";
import { ShoppingCheckout } from "@/pages/shopping/checkout";
import { ShoppingHome } from "@/pages/shopping/home";
import PaypalReturnPage from "../pages/shopping/paypalReturn";
import PaymentSuccessPage from "../pages/shopping/paymentSuccess";

import ShoppingListing from "@/pages/shopping/listing";
import { shoppingRoutes as shopRoutes } from "../shared/routes";
import { Navigate } from "react-router-dom";
import SearchProducts from "../pages/shopping/search";

const shoppingRoutes = [
  {
    path: "*",
    element: <Navigate to={shopRoutes.home} replace />,
    index: true,
  },

  {
    path: shopRoutes.home,
    element: <ShoppingHome />,
  },
  {
    path: shopRoutes.checkout,
    element: <ShoppingCheckout />,
  },
  {
    path: shopRoutes.account,
    element: <ShoppingAccount />,
  },
  {
    path: shopRoutes.listing,
    element: <ShoppingListing />,
  },
  {
    path: shopRoutes.paymentSuccess,
    element: <PaymentSuccessPage />,
  },
  {
    path: shopRoutes.paymentReturn,
    element: <PaypalReturnPage />,
  },
  {
    path: shopRoutes.search,
    element: <SearchProducts />,
  },
];

export default shoppingRoutes;
