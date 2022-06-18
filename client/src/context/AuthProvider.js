import { useState, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BACKEND_URL from "../config";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const authenticateUser = async (username, password) => {
  const response = await fetch(BACKEND_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return null;
  }
  return "sample-token";
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const attemptLogin = async (username, password) => {
    try {
      const token = await authenticateUser(username, password);
      if (token === null) {
        setErrorMessage("Wrong username or password!");
        navigate("/login");
      } else {
        setToken(token);
        navigate("/home");
      }
    } catch (err) {
      setErrorMessage("Network connection failure :(");
    }

    // Work in progress: feature: navigate user back to page where they came from after login
    // const origin = location.state?.from?.pathname || "/login";
    // navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = { token, errorMessage, attemptLogin, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
