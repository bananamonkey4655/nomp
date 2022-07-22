import LoadingDisplay from "components/LoadingDisplay";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";

function Logout() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    navigate("/home");
  }, []);

  return <LoadingDisplay />;
}

export default Logout;
