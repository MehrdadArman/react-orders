import { OrderByIdResponseT } from "@/typing/orders";
import React from "react";

type OrderInfoCardPropsT = {
  order: OrderByIdResponseT;
};

const OrderInfoCard = ({ order }: OrderInfoCardPropsT): JSX.Element => {
  return (
    <div className="flex flex-col justify-start bg-orange-50 shadow  rounded items-center   border-dashed border-orange-300 border p-5">
      <div className=" flex flex-row justify-between items-center w-full mb-3">
        <span className="text-3xl font-boldx">#{order.id}</span>
        <span className=" text-gray-500">{order.items.length} Order</span>
      </div>
      <hr className="w-full my-5" />
      <div className="w-full">
        <div className=" flex flex-row justify-between">
          <span>Name</span>
          <span>{order.customer.name}</span>
        </div>
        <div className=" flex flex-row justify-between">
          <span>Revenue</span>
          <span>{order.customer.revenue}</span>
        </div>
        <div className=" flex flex-row justify-between">
          <span>Since</span>
          <span>{order.customer.since}</span>
        </div>
      </div>
      <hr className="w-full my-5" />
      <div>
        <div className=" text-2xl  text-blue-500 font-bold">
          Total: {order.total.toFixed(2)}$
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderInfoCard);
