import { useAuth } from "../../context/AuthProvider";

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected Page)</h2>
      <div>Work in progress</div>
    </>
  );
};

export default Dashboard;
