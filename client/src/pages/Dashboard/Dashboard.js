import { useEffect, useState } from "react";
import BACKEND_URL from "../../config";
import { useAuth } from "../../context/AuthProvider";

const Dashboard = () => {
  const { token } = useAuth();
  const [backendResponse, setBackendResponse] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`${BACKEND_URL}/user/info`);
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.error) {
  //       console.log(data.error);
  //     }
  //     setBackendResponse(data.message);
  //   };
  //   fetchData();
  // });

  return (
    <>
      <h2>Dashboard (Protected Page)</h2>
      <div>Work in progress</div>
      {/* <h1>{backendResponse}</h1> */}
    </>
  );
};

export default Dashboard;
