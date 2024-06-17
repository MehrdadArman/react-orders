import * as urls from "@/constants/urlConfig";

import axiosApiInstance from "./axiosInterceptor";

export const getProductsAsync = async () => {
  return await axiosApiInstance.get(urls.getProductsUrl);
};
