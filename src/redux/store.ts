import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
