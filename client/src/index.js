import "./styles/index.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

import React from "react";
import ReactDOM from "react-dom/client";
import "./custom.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /** May have to remove <React.StrictMode> because it causes useEffect to run twice instead of once (i think) */
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
