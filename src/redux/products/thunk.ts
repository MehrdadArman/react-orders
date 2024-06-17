import { createAsyncThunk } from "@reduxjs/toolkit";

import * as productsServices from "@/services/productsServices";
import { ProductT } from "@/typing/products";

export const getProdcuts = createAsyncThunk<ProductT[]>(
  "products/get",
  async () => {
    const { data } = await productsServices.getProductsAsync();

    return data;
  }
);
