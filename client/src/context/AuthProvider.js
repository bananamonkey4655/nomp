import { useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../config";

const AuthContext = createContext(null);

// Create custom authentication hook
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const attemptRegister = async (username, password) => {
    try {
      const token = await authenticateUser("register", username, password);
      setToken(token);
      if (token) {
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMessage("Failure to connect to server :(");
      setIsLoading(false);
    }
  };

  const attemptLogin = async (username, password) => {
    try {
      const token = await authenticateUser("login", username, password);
      setToken(token);
      if (token) {
        // Send user back to page where they were after logging in
        const origin = location.state?.from?.pathname || "/group";
        navigate(origin);
      }
    } catch (err) {
      setErrorMessage("Failure to connect to server :(");
      setIsLoading(false);
    }
  };

  const authenticateUser = async (method, username, password) => {
    setIsLoading(true);

    const response = await fetch(`${BACKEND_URL}/auth/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setErrorMessage(data.message);
      return null;
    }

    return data.token;
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    errorMessage,
    setErrorMessage,
    attemptRegister,
    attemptLogin,
    handleLogout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
