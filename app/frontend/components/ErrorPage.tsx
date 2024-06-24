import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page" className="flex flex-col mt-50 justify-items-center space-y-5 text-center">
      <h1 className="text-lg font-semibold">Oops!</h1>
      <p className="text-base font-semibold">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="italic">
          {isRouteErrorResponse(error)
            ? error.statusText || error.data
            : "Unknown error"}
        </i>
      </p>
    </div>
  );
};
