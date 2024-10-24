import { useRouteError } from "react-router-dom";

type ErrorProps = {
  statusText?: string
  message?: string
};

export function ErrorPage(){
  const error = useRouteError() as ErrorProps

  if (typeof error === "object" && error !== null) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    )
  }else{
    return <div>Error occurred. Please check the console for details.</div>;
  }
}