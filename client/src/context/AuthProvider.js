import { useState, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
};

const authenticateUser = async (username, password) => {
  const response = await fetch("https://orbital-nomp.netlify.app/auth/login", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
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
  const [error, setError] = useState("");

  const attemptLogin = async (username, password) => {
    try {
      const token = await authenticateUser(username, password);
      if (token === null) {
        setError("Wrong username or password!");
      }
      setToken(token);
    } catch (err) {
      setError("Network connection failure");
    }

    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = { token, error, attemptLogin, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
