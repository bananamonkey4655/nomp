const production = "https://backend-nomp.herokuapp.com";
const development = "http://localhost:8000";

const BACKEND_URL =
  process.env.NODE_ENV === "development" ? development : production;

export default BACKEND_URL;
