import { CustomerT } from "../customers";
import { ProductT } from "../products";

export type OrderStatusT =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "refunded"
  | "failed";

export type OrderT = {
  id: string;
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  total: number;
};

export type OrderItemsT = ProductT & { quantity: number; total: number };
export type OrderByIdResponseT = {
  id: string;
  customer: CustomerT;
  items: OrderItemsT[];
  total: number;
};
