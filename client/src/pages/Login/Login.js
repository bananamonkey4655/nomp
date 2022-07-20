import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ErrorMessage from "components/ErrorMessage";
import LoadingDisplay from "components/LoadingDisplay";

import { useEffect, useState } from "react";
import { useAuth } from "context/AuthProvider";
import { useSocket } from "context/SocketProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { token, isLoading, errorMessage, attemptLogin } = useAuth();
  const { disconnectSocket } = useSocket();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // If already logged in, send back to home page
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    disconnectSocket();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    attemptLogin(form);
    setForm({ username: "", password: "" });
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  const { username, password } = form;

  return (
    <div className="login-wrapper">
      <div className="login-form">
        {errorMessage && <ErrorMessage />}
        <h1 className="mb-3">Login</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              maxLength="18"
              autoComplete="off"
              value={username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <Form.Text className="text-dark ">Welcome to Nomp!</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              maxLength="18"
              value={password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </Form.Group>
          <Button
            disabled={isLoading}
            variant="primary"
            size="lg"
            type="submit"
            className="login-button btn-dark mt-3"
          >
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
