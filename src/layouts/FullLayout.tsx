import { Outlet } from "react-router-dom";

const FullLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default FullLayout;
