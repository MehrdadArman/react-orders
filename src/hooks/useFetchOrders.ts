import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getOrders } from "@/redux/orders/thunk";
import { useEffect } from "react";

export const useFetchOrders = () => {
  // ** dispatch
  const dispatch = useAppDispatch();

  // ** Selectors
  const ordersList = useAppSelector((state) => state.orders.ordersList);
  const getOrdersLoading = useAppSelector(
    (state) => state.orders.getOrdersLoading
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return {
    ordersList,
    getOrdersLoading,
  };
};
