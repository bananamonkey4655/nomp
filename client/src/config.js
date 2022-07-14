const production = {
  frontend: "https://orbital-nomp.netlify.app",
  backend: "https://backend-nomp.herokuapp.com",
};
const development = {
  frontend: "http://localhost:3000",
  backend: "http://localhost:8000",
};

const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? development.frontend
    : production.frontend;

const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? development.backend
    : production.backend;

export { FRONTEND_URL, BACKEND_URL };
