import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const prod = import.meta.env.ENVIRONMENT;

  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center">
      <h1 className=" text-3xl">404</h1>
      <p className=" mb-5">Page not found</p>
      <span className=" mb-5">
        {isRouteErrorResponse(error)
          ? "The requested page was not found."
          : prod !== "DEVELOPMENT"
          ? "An unexpected error occurred."
          : (error as Error).message}
      </span>

      <Link to={"/"}>
        <Button>Go back to home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
