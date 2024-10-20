import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { shoppingRoutes } from "../../shared/routes";
import { capturePayment, resetCart } from "../../store/slices/shopSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  //   const params = new URLSearchParams(location.search);
  const paymentId = "";
  const payerId = "";

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    dispatch(capturePayment({ paymentId, payerId, orderId }))
      .unwrap()
      .then(() => {
        sessionStorage.removeItem("currentOrderId");
        dispatch(resetCart());
        navigate(shoppingRoutes.paymentSuccess);
      });
    // if (paymentId && payerId) {

    //   dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
    //     if (data?.payload?.success) {
    //       sessionStorage.removeItem("currentOrderId");

    //     }
    //   });
    // }
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
