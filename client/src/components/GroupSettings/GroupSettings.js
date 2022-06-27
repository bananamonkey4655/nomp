import "./GroupSettings.css";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupSettings = ({ isHost }) => {
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
    <div className="group-settings-box">
      {isHost ? (
        <form onSubmit={findEateries}>
          <h2>Group Settings</h2>
          <div>
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
          <div>Get Link</div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="btn-dark"
          >
            Start Deciding
          </Button>
        </form>
      ) : (
        <h1>Waiting for host...</h1>
      )}
    </div>
  );
};

export default GroupSettings;
