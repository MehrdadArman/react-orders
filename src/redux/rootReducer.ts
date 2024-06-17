import { combineReducers } from "redux";

import ordersReducer from "./orders/slice";
import productsReducer from "./products/slice";

const rootReducer = combineReducers({
  orders: ordersReducer,
  products: productsReducer,
});

export default rootReducer;
