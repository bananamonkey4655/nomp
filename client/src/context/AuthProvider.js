import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import BACKEND_URL from "../config";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const attemptLogin = async (username, password) => {
    try {
      setIsLoading(true);
      const token = await authenticateUser(username, password);
      setIsLoading(false);
      if (token === null) {
        setErrorMessage("Wrong username or password!");
        navigate("/login");
      } else {
        setToken(token);
        navigate("/home");
      }
    } catch (err) {
      setErrorMessage("Network connection failure :(");
      setIsLoading(false);
    }

    // Work in progress: feature: navigate user back to page where they came from after login

    // const origin = location.state?.from?.pathname || "/login";
    // navigate(origin);
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
    return "sample-token"; //edit this
  };

  const attemptRegister = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(BACKEND_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      setIsLoading(false);
      navigate("/login");
      // TODO: logic on if username already taken etc, response is a failure
    } catch (err) {
      setErrorMessage("Network connection failure :(");
      setIsLoading(false);
    }
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
