import "./groupsettings.css";
import Button from "react-bootstrap/Button";
import BACKEND_URL from "../../config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";

import useGeoLocation from "../../hooks/useGeoLocation";


const GroupSettings = ({ isHost }) => {
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchErrorMessage, setFetchErrorMessage] = useState(""); 
  
  const { socket, groupId } = useSocket();
  const navigate = useNavigate();
  const geoLocation = useGeoLocation();

  function pasteAddress(geoLocation) {
    if (geoLocation.loaded) {
      fetchDataAndPaste();
    } else {
      console.log("Location data not available yet")
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

    socket.emit("host-start-search", { location, searchTerm, groupId });
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
            <Button variant="primary" onClick={() => pasteAddress(geoLocation)} className="fw-bold shadow mx-3 w-25 h-25"> Get Location </Button>
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
