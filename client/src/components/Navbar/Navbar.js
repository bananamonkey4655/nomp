import "./Navbar.css";

import Logo from "components/Logo";

import { NavLink } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import { useSocket } from "context/SocketProvider";

function Navbar() {
  const { token, handleLogout } = useAuth();
  const { quitGroup } = useSocket();

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
            onClick={quitGroup}
          >
            Home
          </NavLink>
        </li>
        <li>
          {token && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "activenav" : "navlink")}
              onClick={quitGroup}
            >
              Dashboard
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/group"
            className={({ isActive }) => (isActive ? "activenav" : "navlink")}
            onClick={quitGroup}
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
            <button
              type="button"
              onClick={() => {
                handleLogout();
                quitGroup();
              }}
            >
              Sign Out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
