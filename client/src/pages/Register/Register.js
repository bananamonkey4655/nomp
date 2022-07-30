import styles from "./Register.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ErrorMessage from "components/ErrorMessage";
import LoadingDisplay from "components/LoadingDisplay";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";

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
  }, [token, navigate]);

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
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className="mb-3">Register an account</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mt-4" controlId="username">
            <Form.Label className={styles.title}>Username</Form.Label>
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

          <Form.Group className="mt-3" controlId="password">
            <Form.Label className={styles.title}>Password</Form.Label>
            <Form.Control
              className={errorMessage ? styles.password : ""}
              type="password"
              placeholder="Password"
              maxLength="18"
              value={password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <div className={styles.error}>
              <ErrorMessage message={errorMessage} />
            </div>
          </Form.Group>
          <Button
            disabled={isLoading || form.username === "" || form.password === ""}
            variant="primary"
            size="lg"
            type="submit"
            className={styles.btn}
          >
            Continue
          </Button>
        </Form>
        <p className={styles.signup}>
          <span>Already have an account?</span>
          <Link className={styles.link} to="/login">
            Log in.
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
