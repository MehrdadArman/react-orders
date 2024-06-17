import { db } from "./db";

export const handlers = [
  ...db.product.toHandlers("rest"),
  ...db.order.toHandlers("rest"),
  ...db.customer.toHandlers("rest"),
  ...db.category.toHandlers("rest"),
  ...db.orderItem.toHandlers("rest"),
];
