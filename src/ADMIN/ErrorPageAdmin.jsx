import { useRouteError, Link } from "react-router-dom";

const ErrorPageAdmin = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-6xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <Link
        className="bg-red-500 text-white py-4 px-6 rounded-full"
        to="/admin">
        Admin
      </Link>
    </div>
  );
};

export default ErrorPageAdmin;
