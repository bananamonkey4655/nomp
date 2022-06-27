import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected Page)</h2>
      <div>Authenticated</div>
      <div>Placeholder for dashboard</div>
    </>
  );
};

export default Dashboard;
