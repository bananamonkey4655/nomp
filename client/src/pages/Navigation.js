import "../styles/Navigation.css";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import Logo from "../components/Logo";

const Navigation = () => {
  const { token, handleLogout } = useAuth();
  return (
    <nav>
      <div className="nav-logo">
        <Logo />
        <h1>NOMP</h1>
      </div>
      <ul className="navbar">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "activenav" : "navlink")}
          >
            Home
          </NavLink>
        </li>
        <li>
          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "activenav" : "navlink")}
            >
              Dashboard
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/group"
            className={({ isActive }) => (isActive ? "activenav" : "navlink")}
          >
            I'm Hungry
          </NavLink>
        </li>
        <li className="signup-link">
          {!token && (
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "activenav" : "navlink")}
            >
              Sign Up
            </NavLink>
          )}
        </li>
        <li>
          {!token && (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "activenav" : "navlink")}
            >
              Log in
            </NavLink>
          )}
        </li>
        <li>
          {token && (
            <button type="button" onClick={handleLogout}>
              Sign Out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
