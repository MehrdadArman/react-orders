import ReduxProvider from "@/providers/ReduxProvider";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MemoryRouter>
        <ReduxProvider>{children}</ReduxProvider>
      </MemoryRouter>
    </>
  );
};

export default Providers;
