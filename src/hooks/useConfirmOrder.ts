import { useCallback, useState } from "react";

// **Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { postConfirmOrder } from "@/redux/orders/thunk";

// ** typings
import { OrderStatusT, OrderT } from "@/typing/orders";

// ** toast
import { toast } from "react-toastify";

export const useConfirmOrder = () => {
  const dispatch = useAppDispatch();
  const postConfirmOrderloading = useAppSelector(
    (state) => state.orders.postConfirmOrderloading
  );

  const [orderStatus, setOrderStatus] = useState<OrderStatusT>("pending");

  const submitConfirmOrder = useCallback(
    async (order: OrderT) => {
      try {
        await dispatch(postConfirmOrder(order)).unwrap();

        setOrderStatus("confirmed");
        toast.success("Order confirmed successfully");
      } catch (err) {
        setOrderStatus("failed");
        toast.error("Error while confirming order");
      }
    },
    [dispatch]
  );

  return {
    submitConfirmOrder,
    orderStatus,
    postConfirmOrderloading,
  };
};
