import * as urls from "@/constants/urlConfig";

import axiosApiInstance from "./axiosInterceptor";
import { OrderT } from "@/typing/orders";

export const getOrdersAsync = async () => {
  return await axiosApiInstance.get(urls.getOrdersUrl);
};

export const getOrderByIdAsync = async (orderId: string) => {
  return await axiosApiInstance.get(urls.getOrderByIdUrl(orderId));
};

export const postConfirmOrderAsync = async (order: OrderT) => {
  const { id } = order;
  return await axiosApiInstance.post(urls.postConfirmOrderUrl(id), {
    ...order,
  });
};
