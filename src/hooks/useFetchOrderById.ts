import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getOrderById } from "@/redux/orders/thunk";

type UseFetchOrderByIdProps = {
  orderId: string;
};

export const useFetchOrderById = ({ orderId }: UseFetchOrderByIdProps) => {
  // ** dispatch
  const dispatch = useAppDispatch();

  // ** Selectors
  const orderByIdData = useAppSelector((state) => state.orders.orderByIdData);
  const getOrderByIdloading = useAppSelector(
    (state) => state.orders.getOrderByIdloading
  );

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch]);

  return {
    orderByIdData,
    getOrderByIdloading,
  };
};
