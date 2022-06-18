import "./Logo.css";
import logo from "../../assets/Nomp_placeholder_icon.png";

const Logo = () => {
  return (
    <div className="logo fw-bold text-primary">
      <img className="nomp-icon" src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
