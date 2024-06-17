import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { getProdcuts } from "./thunk";

import { ProductT } from "@/typing/products";

export interface ProductStateT {
  productsList: ProductT[];
  getProductsLoading: boolean;
  error: string | null;
}

const initialState: ProductStateT = {
  productsList: [],
  getProductsLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProdcuts.pending, (state) => {
      state.getProductsLoading = true;
      state.error = null;
    });
    builder.addCase(getProdcuts.fulfilled, (state, action) => {
      state.getProductsLoading = false;
      state.productsList = action.payload;
    });
    builder.addCase(getProdcuts.rejected, (state, action) => {
      state.getProductsLoading = false;
      state.error = action.error.message!;
    });
  },
  reducers: {},
});

export const productsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
