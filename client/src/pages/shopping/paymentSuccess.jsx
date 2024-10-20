import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { shoppingRoutes } from "../../shared/routes";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
      </CardHeader>
      <Button className="mt-5" onClick={() => navigate(shoppingRoutes.account)}>
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
