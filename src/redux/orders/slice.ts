import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { getOrderById, getOrders, postConfirmOrder } from "./thunk";
import { OrderByIdResponseT, OrderItemsT, OrderT } from "@/typing/orders";

export interface OrderStateT {
  ordersList: OrderT[];
  getOrdersLoading: boolean;
  error: string | null;

  orderByIdData: OrderByIdResponseT | null;
  errorById: string | null;
  getOrderByIdloading: boolean;

  postConfirmOrderloading: boolean;
}

const initialState: OrderStateT = {
  ordersList: [],
  getOrdersLoading: false,
  error: null,

  errorById: null,
  orderByIdData: null,
  getOrderByIdloading: false,

  postConfirmOrderloading: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.getOrdersLoading = true;
      state.error = null;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.getOrdersLoading = false;
      state.ordersList = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.getOrdersLoading = false;
      state.error = action.error.message!;
    });

    //**  getOrderById
    builder.addCase(getOrderById.pending, (state) => {
      state.getOrderByIdloading = true;
      state.errorById = null;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.getOrderByIdloading = false;
      state.orderByIdData = action.payload;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.getOrderByIdloading = false;
      state.errorById = action.error.message!;
    });

    // ** postConfirmOrder
    builder.addCase(postConfirmOrder.pending, (state) => {
      state.postConfirmOrderloading = true;
      state.error = null;
    });
    builder.addCase(postConfirmOrder.fulfilled, (state) => {
      state.postConfirmOrderloading = false;
    });
    builder.addCase(postConfirmOrder.rejected, (state, action) => {
      state.postConfirmOrderloading = false;
      state.error = action.error.message!;
    });
  },
  reducers: {
    deleteOrderItem(state, action: PayloadAction<{ itemId: string }>) {
      const { itemId } = action.payload;
      const orderByIdDataObj = { ...state.orderByIdData };

      const updatedOrderItems = orderByIdDataObj?.items?.filter(
        (item) => item.id !== itemId
      );

      let total = updatedOrderItems?.reduce((acc, item) => acc + item.total, 0);

      const updatedOrderById = {
        ...orderByIdDataObj,
        items: updatedOrderItems,
        total,
      };

      state.orderByIdData = updatedOrderById as OrderByIdResponseT;
    },
    addOrderItem(state, action: PayloadAction<{ item: OrderItemsT }>) {
      const { item } = action.payload;
      const orderByIdDataObj = { ...state.orderByIdData };
      let orderItems = [...(orderByIdDataObj.items ?? [])];

      const existingItem = orderItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        orderItems.push(item);
      }

      let total = orderItems?.reduce((acc, item) => acc + item.total, 0);

      const updatedOrderById = {
        ...orderByIdDataObj,
        items: orderItems,
        total,
      };

      state.orderByIdData = updatedOrderById as OrderByIdResponseT;
    },
  },
});

export const ordersSelector = (state: RootState) => state.orders;
export const ordersActions = ordersSlice.actions;

export default ordersSlice.reducer;
