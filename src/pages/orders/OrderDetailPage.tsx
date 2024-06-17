// ** React Router
import { useParams } from "react-router-dom";

// ** Components
import OrderItemsTable from "./components/OrderItemsTable";
import OrderInfoCard from "./components/OrderInfoCard";
import OurSuggestions from "./components/OurSuggestions";
import ConfirmOrderCard from "./components/ConfirmOrderCard";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useFetchOrderById } from "@/hooks/useFetchOrderById";

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.id!;

  // ** our custome hooks to fetch data
  const { productsList, getProductsLoading } = useFetchProducts();
  const { orderByIdData, getOrderByIdloading } = useFetchOrderById({ orderId });

  if (getOrderByIdloading || getProductsLoading)
    return (
      <div className="justify-center flex flex-col h-screen items-center">
        Loading...
      </div>
    );

  if (!orderByIdData) return <div>The order was not found.</div>;

  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-end-5  gap-4 my-10">
          <div className="col-start-2 col-span-4 mb-5">
            <OrderItemsTable products={orderByIdData.items} />
          </div>
          <div className="col-start-2 col-span-4 mb-5">
            <OurSuggestions products={productsList} />
          </div>
        </div>
        <div className="col-start-5 col-end-6  my-10">
          <ConfirmOrderCard order={orderByIdData} />
          <div className="mt-5">
            <OrderInfoCard order={orderByIdData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;
