import LoadingDisplay from "../../components/LoadingDisplay";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { BACKEND_URL } from "../../config";
import useFetch from "../../hooks/useFetch";

function Dashboard() {
  const { token } = useAuth();

  const { response, isLoading, error } = useFetch(`${BACKEND_URL}/user/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <div>
      <h2>Dashboard (Protected Page)</h2>
      <h1>{response?.user.username}</h1>
    </div>
  );
}

export default Dashboard;
