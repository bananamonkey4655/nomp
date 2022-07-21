const production = "https://orbital-nomp.netlify.app";
const development = "http://localhost:3000";

const FRONTEND_URL =
  process.env.NODE_ENV === "development" ? development : production;

module.exports = FRONTEND_URL;
