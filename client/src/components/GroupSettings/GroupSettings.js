import "./GroupSettings.css";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupSettings = () => {
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const findEateries = (e) => {
    e.preventDefault();

    navigate(`/findeatery/${location}/${searchTerm}`);
    setLocation("");
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={findEateries}
      className="group-settings-box shadow d-flex flex-column txt-center"
    >
      <h2 className="settings fw-light text-center fs-1 mt-3">Settings</h2>
      <div className="people">Number of people</div>
      <div className="location">
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Search</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filters">Filters</div>
      <div className="get-link">Get Link</div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="fw-bold shadow"
      >
        Start Deciding
      </Button>
    </form>
  );
};

export default GroupSettings;
