import "./GroupSettings.css";
import Button from "react-bootstrap/Button";

import Loader from "components/Loader";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";
import useGeoLocation from "hooks/useGeoLocation";
import { BACKEND_URL } from "config";

function GroupSettings({ isHost }) {
  const DEFAULT_RADIUS_METRES = 10;
  const { socket } = useSocket();
  const { groupId } = socket;
  const navigate = useNavigate();
  const geoLocation = useGeoLocation();

  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [form, setForm] = useState({
    location: "",
    query: "",
    budget: "no-preference",
    coordinates: null,
    radius: DEFAULT_RADIUS_METRES,
  });

  /** Controlled component form state handlers */
  const allowLocationInput = (e) => {
    e.preventDefault();
    setForm({ ...form, location: "", coordinates: null });
  };

  const isBudgetSelected = (selectedBudget) => form.budget === selectedBudget;

  const handleRadioClick = (e) =>
    setForm({ ...form, budget: e.currentTarget.value });

  const handleRadiusChange = (e) =>
    setForm({ ...form, radius: e.target.value });

  const getLocation = async () => {
    if (!geoLocation.loaded) {
      return;
    }

    const response = await fetch(
      `${BACKEND_URL}/geolocation/get?lat=${geoLocation.coordinates.latitude}&lng=${geoLocation.coordinates.longitude}`
    );
    const data = await response.json();

    if (data.error) {
      setFetchErrorMessage(`${data.error.code}: ${data.error.description}`);
      return;
    }

    setForm({
      ...form,
      location: data.results[1].formatted_address,
      coordinates: geoLocation.coordinates,
    });
  };

  // Handle form submission
  const findEateries = (e) => {
    e.preventDefault();

    socket.emit("host-start-search", {
      ...form,
      groupId,
    });
    navigate("/voting", {
      state: form,
    });

    setForm({ ...form, location: "" });
    setForm({ ...form, query: "" });
  };

  const { location, query, coordinates, budget, radius } = form;

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
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              readOnly={coordinates}
              required
            />
            <Button
              variant="secondary"
              size="lg"
              onClick={getLocation}
              className="fw-bold shadow ms-3 get-location-button"
            >
              Get Location
            </Button>
            <button onClick={allowLocationInput}>Remove coordinates</button>
          </div>

          <div>
            <h5>Coordinates: {JSON.stringify(coordinates)}</h5>
          </div>

          <div>
            <label className="me-3 mt-3 fs-5 fw-bold group-settings-text">
              Search
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setForm({ ...form, query: e.target.value })}
            />
          </div>

          <div>
            <label>Budget</label>
            <label>
              <input
                type="radio"
                value="no-preference"
                name="budget"
                checked={isBudgetSelected("no-preference")}
                onChange={handleRadioClick}
              />
              No preference
            </label>
            <label>
              <input
                type="radio"
                value="low-budget"
                name="budget"
                checked={isBudgetSelected("low-budget")}
                onChange={handleRadioClick}
              />
              $
            </label>
            <label>
              <input
                type="radio"
                value="mid-budget"
                name="budget"
                checked={isBudgetSelected("mid-budget")}
                onChange={handleRadioClick}
              />
              $$
            </label>
            <label>
              <input
                type="radio"
                value="high-budget"
                name="budget"
                checked={isBudgetSelected("high-budget")}
                onChange={handleRadioClick}
              />
              $$$
            </label>
          </div>

          <div>
            <label>
              Radius (km)
              <input
                type="range"
                value={radius}
                onChange={handleRadiusChange}
                min="0"
                max="40"
              />
            </label>
            <div>{radius}</div>
          </div>

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
