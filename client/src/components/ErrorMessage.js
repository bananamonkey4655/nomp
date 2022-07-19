import { useAuth } from "context/AuthProvider";

function ErrorMessage() {
  const { errorMessage } = useAuth();

  return (
    <>
      <h1 style={{ color: "red" }}>Error</h1>
      <p>{errorMessage}</p>
    </>
  );
}

export default ErrorMessage;
