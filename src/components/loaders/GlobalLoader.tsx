import { ReactNode } from "react";

const GlobalLoader = (): ReactNode => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center bg-gray-300">
        <div className="flex flex-row justify-center items-center">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </div>
          <span>
            <p className="text-blac text-2xl ml-2">Loading...</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default GlobalLoader;
