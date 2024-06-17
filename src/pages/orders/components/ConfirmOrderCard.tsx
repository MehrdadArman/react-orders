import React from "react";
import { useEffect } from "react";

// ** components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfirmOrder } from "@/hooks/useConfirmOrder";

// ** typings
import { OrderByIdResponseT, OrderStatusT } from "@/typing/orders";

// ** React Router
import { useNavigate } from "react-router-dom";

type ConfirmOrderPropsT = {
  order: OrderByIdResponseT;
};

const ConfirmOrderCard = ({ order }: ConfirmOrderPropsT) => {
  const navigate = useNavigate();
  const { submitConfirmOrder, orderStatus, postConfirmOrderloading } =
    useConfirmOrder();

  const redirectToOrderStatus = (data: { orderStatus: OrderStatusT }) => {
    navigate(`/orders/${order.id}/status`, {
      replace: true,
      state: data,
    });
  };

  const handleConfirmOrder = async () => {
    const { id, total, customer, items } = order;
    const orderItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
      total: item.total,
    }));

    await submitConfirmOrder({
      id,
      customerId: customer.id,
      items: orderItems,
      total,
    });
  };

  useEffect(() => {
    if (orderStatus !== "pending") {
      redirectToOrderStatus({ orderStatus });
    }
  }, [orderStatus]);

  return (
    <Card>
      <CardContent>
        <Button
          variant={"default"}
          className="w-full mt-5"
          disabled={
            order.items.length === 0 || postConfirmOrderloading ? true : false
          }
          onClick={handleConfirmOrder}
        >
          {postConfirmOrderloading ? "Loading..." : "Confirm order"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(ConfirmOrderCard);
