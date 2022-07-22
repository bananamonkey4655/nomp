import styles from "./Logo.module.css";
import logo from "assets/Nomp_placeholder_icon.png";

function Logo() {
  return (
    <div>
      <img className={styles.logo} src={logo} alt="Nomp Icon" />
    </div>
  );
}

export default Logo;
