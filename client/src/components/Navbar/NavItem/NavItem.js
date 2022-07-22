import styles from "./NavItem.module.css";

import { NavLink } from "react-router-dom";
import { useSocket } from "context/SocketProvider";

function NavItem({ item, link, handleClick }) {
  const { quitGroup } = useSocket();
  const defaultClassNames = `${styles.navlink} `;
  const activeClassNames = `${styles.activenav} ${styles.navlink}`;

  return (
    <li>
      <NavLink
        to={`${link}`}
        className={({ isActive }) =>
          isActive ? activeClassNames : defaultClassNames
        }
        onClick={() => {
          handleClick();
          quitGroup();
        }}
      >
        {item}
      </NavLink>
    </li>
  );
}

export default NavItem;
