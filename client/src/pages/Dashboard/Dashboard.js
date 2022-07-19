import LoadingDisplay from "components/LoadingDisplay";

import { useEffect } from "react";
import { useAuth } from "context/AuthProvider";
import { useSocket } from "context/SocketProvider";
import useFetch from "hooks/useFetch";
import { BACKEND_URL } from "config";

function Dashboard() {
  const { token } = useAuth();
  const { disconnectSocket } = useSocket();

  useEffect(() => {
    disconnectSocket();
  }, []);

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
