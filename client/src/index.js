import "./styles/index.css";
import "./custom.scss";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /** May have to remove <React.StrictMode> because it causes useEffect to run twice instead of once (i think) */
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
