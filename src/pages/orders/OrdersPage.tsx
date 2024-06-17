// ** Components
import OrdersTable from "./components/OrdersTable";
import { useFetchOrders } from "@/hooks/useFetchOrders";

const OrdersPage = () => {
  const { getOrdersLoading, ordersList } = useFetchOrders();

  if (getOrdersLoading)
    return (
      <>
        <div className="justify-center flex flex-col h-screen items-center">
          <span>Loading...</span>
        </div>
      </>
    );

  return (
    <>
      <div className="grid grid-cols-6 gap-4 mt-5">
        <div className="col-start-2 col-span-4 ">
          <OrdersTable data={ordersList} />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
