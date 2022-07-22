import "./Navbar.css";

import Logo from "components/Logo";
import NavItem from "components/Navbar/NavItem/NavItem";
import HamburgerMenu from "components/Navbar/HamburgerMenu/HamburgerMenu";

import { useAuth } from "context/AuthProvider";

function Navbar() {
  const { token } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Logo />
        <h1 className="title">NOMP</h1>
      </div>
      <ul className="navlist">
        <NavItem item="Home" link="/home" />
        <NavItem item="I'm Hungry" link="/group" />
        {!token && <NavItem item="Sign Up" link="/register" />}
        {!token && <NavItem item="Log in" link="/login" />}
        {token && <NavItem item="Sign Out" link="/signout" />}
      </ul>
      <HamburgerMenu />
    </nav>
  );
}

export default Navbar;
