"use client";

const ErrorPage = ({ error, reset }) => {
  return (
    <div>
      <div role="alert" className="alert alert-error">
        <span>{error.message}</span>
      </div>
      <button className="btn btn-error" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
