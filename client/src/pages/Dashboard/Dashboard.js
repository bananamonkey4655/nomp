import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { useAuth } from "../../context/AuthProvider";

const Dashboard = () => {
  const { token } = useAuth();
  const [backendResponse, setBackendResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${BACKEND_URL}/user/info`, { headers });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        console.log(data.error);
      }
      setBackendResponse(data.user.username);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard (Protected Page)</h2>
      <h1>{backendResponse}</h1>
    </div>
  );
};

export default Dashboard;
