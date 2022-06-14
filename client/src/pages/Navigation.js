import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navigation() {
  const { token, handleLogout } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/register">Sign Up</NavLink>

      {token && (
        <button type="button" onClick={handleLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
}

export default Navigation;
