import { useAuth } from "../context/AuthProvider";

function ErrorMessage() {
  const { error } = useAuth();

  return (
    <>
      <h1 style={{ color: "red" }}>Error</h1>
      <p>{error}</p>
    </>
  );
}

export default ErrorMessage;
