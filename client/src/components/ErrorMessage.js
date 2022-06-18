import { useAuth } from "../context/AuthProvider";

const ErrorMessage = () => {
  const { errorMessage } = useAuth();

  return (
    <>
      <h1 style={{ color: "red" }}>Error</h1>
      <p>{errorMessage}</p>
    </>
  );
};

export default ErrorMessage;
