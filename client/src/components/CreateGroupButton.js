import "../styles/creategroupbutton.css";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

const CreateGroupButton = () => {
  return (
    <div className="create-group-box shadow border-50 border-secondary d-flex flex-column text-center">
      <h3 className="slogan fw-bold">
        An efficient way to find where to eat with others
      </h3>
      <Link to="/group">
        <Button variant="primary" size="lg" className="fw-bold shadow">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default CreateGroupButton;
