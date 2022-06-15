import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";

import ErrorMessage from "./ErrorMessage";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, attemptLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    attemptLogin(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ backgroundColor: "antiquewhite" }}>
      {error && <ErrorMessage />}
      <h1>Login</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            maxLength="12"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Text className="text-muted">Welcome to Nomp</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            maxLength="12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default Login;
