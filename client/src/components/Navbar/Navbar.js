import styles from "./Navbar.module.css";

import Logo from "components/Logo";
import NavItem from "components/Navbar/NavItem/NavItem";
import HamburgerMenu from "components/Navbar/HamburgerMenu/HamburgerMenu";

import { useAuth } from "context/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const { token } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <Logo />
          <h1 className={styles.title}>NOMP</h1>
        </Link>
        <ul className={styles.navlist}>
          <NavItem item="Home" link="/" />
          <NavItem item="I'm Hungry" link="/group" />
          {!token && <NavItem item="Sign Up" link="/register" />}
          {!token && <NavItem item="Log in" link="/login" />}
          {token && <NavItem item="Sign Out" link="/signout" />}
        </ul>
        <div className={styles.hamburger}>
          <HamburgerMenu />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
