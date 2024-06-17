import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// ** Router packages
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import GlobalLoader from "./components/loaders/GlobalLoader";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<GlobalLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
