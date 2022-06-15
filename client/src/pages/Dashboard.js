import { useAuth } from "../context/AuthProvider";

function Dashboard() {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected Page)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
}

export default Dashboard;
