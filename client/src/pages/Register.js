import "../styles/Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import ErrorMessage from "../components/ErrorMessage";
import LoadingDisplay from "../components/LoadingDisplay";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, errorMessage, attemptRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    attemptRegister(username, password);

    setUsername("");
    setPassword("");
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    <div className="register-wrapper">
      <div className="register-form">
        <h1 className="mb-3">Register</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              maxLength="18"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              maxLength="18"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            disabled={isLoading}
            variant="primary"
            size="lg"
            type="submit"
            className="register-button btn-dark mt-3"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
