import { Button } from "@/components/ui/button";
import { OrderStatusT } from "@/typing/orders";

// ** Icons
import { ClockIcon, Cross2Icon } from "@radix-ui/react-icons";
import { CheckCircle2 } from "lucide-react";
import { ReactNode } from "react";

// ** React Router
import { Link, useLocation } from "react-router-dom";

const OrderStatusPage = () => {
  const { state } = useLocation();

  const orderStatus: OrderStatusT = state?.orderStatus;

  const statusMessages: {
    [key in OrderStatusT]: { title: string; icon: ReactNode };
  } = {
    pending: {
      title: "Your order is pending.",
      icon: <ClockIcon className=" h-32 w-32 text-yellow-500" />,
    },
    confirmed: {
      title: "Your order is confirmed.",
      icon: <CheckCircle2 className=" h-32 w-32 text-green-500" />,
    },
    failed: {
      title: "Your order has failed.",
      icon: <Cross2Icon className=" h-32 w-32 text-red-500" />,
    },
    cancelled: {
      title: "Your order has been cancelled.",
      icon: <ClockIcon className=" h-32 w-32 text-red-500" />,
    },
    refunded: {
      title: "Your order has been refunded.",
      icon: <ClockIcon className=" h-32 w-32 text-green-500" />,
    },
  };

  if (!orderStatus)
    return (
      <div className="grid grid-cols-6 gap-4 h-screen items-center">
        <div className="col-start-3 col-end-5 ">
          <div className="flex flex-col justify-center items-center  shadow p-10 rounded">
            <div className=" mb-5">{statusMessages["pending"].icon}</div>
            <div className="text-4xl font-semibold">
              {statusMessages["pending"].title}
            </div>
            <div className="mt-5">
              <Link to="/" className="text-blue-500">
                <Button>Go back to home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-6 gap-4 h-screen items-center">
      <div className="col-start-3 col-end-5 ">
        <div className="flex flex-col justify-center items-center  shadow p-10 rounded">
          <div className=" mb-5">{statusMessages[orderStatus].icon}</div>
          <div className="text-4xl font-semibold">
            {statusMessages[orderStatus].title}
          </div>
          <div className="mt-5">
            <Link to="/" className="text-blue-500">
              <Button>Go back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
