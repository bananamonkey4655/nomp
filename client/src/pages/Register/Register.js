import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ErrorMessage from "components/ErrorMessage";
import LoadingDisplay from "components/LoadingDisplay";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import { useSocket } from "context/SocketProvider";

function Register() {
  const navigate = useNavigate();
  const { token, isLoading, errorMessage, attemptRegister } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // If already logged in, send back to home page
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    attemptRegister(form);

    setForm({ username: "", password: "" });
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  const { username, password } = form;

  return (
    <div className="register-wrapper d-flex justify-content-center">
      <div className="register-form d-flex flex-column w-50">
        <h1 className="my-3 mx-3 text-center">Register</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mx-3 my-3" controlId="username">
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
          </Form.Group>

          <Form.Group className="mx-3 my-3" controlId="password">
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
            className="register-button btn-dark mx-3 my-3"
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
