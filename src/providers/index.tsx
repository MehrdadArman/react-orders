import { PropsWithChildren } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "./ReduxProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ReduxProvider>
        <ToastContainer />
        {children}
      </ReduxProvider>
    </>
  );
};

export default Providers;
