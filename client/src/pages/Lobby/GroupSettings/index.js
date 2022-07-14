import "./GroupSettings.css";
import Button from "react-bootstrap/Button";

import Loader from "../../../components/Loader";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import useGeoLocation from "../../../hooks/useGeoLocation";
import { BACKEND_URL } from "../../../config";

function GroupSettings({ isHost }) {
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [budget, setBudget] = useState("0");
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");

  const { socket } = useSocket();
  const { groupId } = socket;
  const navigate = useNavigate();
  const geoLocation = useGeoLocation();

  // const handleRadiusChange = (e) => setRadius(e.target.value);
  const handleRadioClick = (e) => setBudget(e.currentTarget.value);
  const isBudgetSelected = (selectedBudget) => budget === selectedBudget;

  function pasteAddress(geoLocation) {
    if (geoLocation.loaded) {
      fetchDataAndPaste();
    } else {
      console.log("Location data not available yet");
    }
  }

  async function fetchDataAndPaste() {
    const response = await fetch(
      `${BACKEND_URL}/geolocation/get?lat=${geoLocation.coordinates.latitude}&lng=${geoLocation.coordinates.longitude}`
    );
    const data = await response.json();
    if (data.error) {
      console.log("Error here");
      console.log(`${data.error.code}: ${data.error.description}`);
      setFetchErrorMessage(`${data.error.code}: ${data.error.description}`);
    } else {
      setLocation(data.results[1].formatted_address);
    }
  }

  const findEateries = (e) => {
    e.preventDefault();

    socket.emit("host-start-search", { location, searchTerm, budget, groupId });
    navigate("/voting", { state: { location, searchTerm, budget } });

    setLocation("");
    setSearchTerm("");
  };

  return (
    <div className="shadow group-settings-box d-flex flex-direction-column">
      {isHost ? (
        <form onSubmit={findEateries}>
          <h2 className="fw-bold text-decoration-underline mt-3 group-settings-text">
            Group Settings
          </h2>

          <div>
            <label className="me-3 mt-5 fw-bold fs-5 group-settings-text">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <Button
              variant="secondary"
              size="lg"
              onClick={() => pasteAddress(geoLocation)}
              className="fw-bold shadow ms-3 get-location-button"
            >
              Get Location
            </Button>
          </div>

          <div>
            <label className="me-3 mt-3 fs-5 fw-bold group-settings-text">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label>Budget</label>
            <label>
              <input
                type="radio"
                value="0"
                name="budget"
                checked={isBudgetSelected("0")}
                onChange={handleRadioClick}
              />
              No preference
            </label>
            <label>
              <input
                type="radio"
                value="1"
                name="budget"
                checked={isBudgetSelected("1")}
                onChange={handleRadioClick}
              />
              $
            </label>
            <label>
              <input
                type="radio"
                value="1, 2"
                name="budget"
                checked={isBudgetSelected("1, 2")}
                onChange={handleRadioClick}
              />
              $$
            </label>
            <label>
              <input
                type="radio"
                value="1, 2, 3"
                name="budget"
                checked={isBudgetSelected("1, 2, 3")}
                onChange={handleRadioClick}
              />
              $$$
            </label>
          </div>

          {/* <div>
            <label>
              Radius
              <input
                type="range"
                value={radius}
                onChange={handleRadiusChange}
                min="100"
                max="40000"
              />
            </label>
          </div> */}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-5 fw-bold"
          >
            Start Deciding
          </Button>
        </form>
      ) : (
        <h1>
          <Loader message="Waiting for host..." />
        </h1>
      )}
    </div>
  );
}

export default GroupSettings;
