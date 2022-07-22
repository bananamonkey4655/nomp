import "./HamburgerMenu.css";

import { slide as Menu } from "react-burger-menu";
import NavItem from "components/Navbar/NavItem/NavItem";
import { useAuth } from "context/AuthProvider";
import { useEffect, useState } from "react";

function HamburgerMenu() {
  const { token } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //TODO: Find out why this works!! onStateChange??
  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu
      onStateChange={handleStateChange}
      isOpen={isMenuOpen}
      right
      width={"100%"}
    >
      <NavItem item="Home" link="/home" handleClick={closeMenu} />
      <NavItem item="I'm Hungry" link="/group" handleClick={closeMenu} />
      {!token && (
        <NavItem item="Sign Up" link="/register" handleClick={closeMenu} />
      )}
      {!token && (
        <NavItem item="Log in" link="/login" handleClick={closeMenu} />
      )}
      {token && (
        <NavItem item="Sign Out" link="/signout" handleClick={closeMenu} />
      )}
    </Menu>
  );
}

export default HamburgerMenu;
