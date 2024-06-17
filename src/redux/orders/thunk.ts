import { createAsyncThunk } from "@reduxjs/toolkit";

import * as ordersServices from "@/services/ordersServices";
import { OrderByIdResponseT, OrderT } from "@/typing/orders";
import { AxiosResponse } from "axios";

export const getOrders = createAsyncThunk<OrderT[]>("orders/get", async () => {
  const { data }: AxiosResponse = await ordersServices.getOrdersAsync();

  return data;
});

export const getOrderById = createAsyncThunk<OrderByIdResponseT, string>(
  "orders/getById",
  async (orderId) => {
    const { data }: AxiosResponse = await ordersServices.getOrderByIdAsync(
      orderId
    );

    return data;
  }
);

export const postConfirmOrder = createAsyncThunk<OrderT, OrderT>(
  "orders/postConfirmOrder",
  async (order) => {
    const { data }: AxiosResponse = await ordersServices.postConfirmOrderAsync(
      order
    );

    return data;
  }
);
