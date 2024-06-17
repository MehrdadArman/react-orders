import { lazy } from "react";

// ** Pages
import ErrorPage from "@/pages/Error/ErrorPage";

// ** Routes packages
import { RouteObject } from "react-router-dom";

// ** render components as a lazy load component
const App = lazy(() => import("../App"));

// **orders
const OrdersPage = lazy(() => import("../pages/orders/OrdersPage"));
const OrderDeatilPage = lazy(() => import("../pages/orders/OrderDetailPage"));
const OrderStatusPage = lazy(() => import("../pages/orders/OrderStatusPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <OrdersPage /> },
      { path: "orders/:id", element: <OrderDeatilPage /> },
      { path: "orders/:id/status", element: <OrderStatusPage /> },
    ],
  },
];

export default routes;
