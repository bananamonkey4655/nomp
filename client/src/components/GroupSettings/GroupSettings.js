import "./groupsettings.css";
import Button from "react-bootstrap/Button";
import BACKEND_URL from "../../config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";

import useGeoLocation from "../../hooks/useGeoLocation";
import Loader from "../Loader/Loader";


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
    <div className="shadow group-settings-box d-flex flex-direction-column">
      {isHost ? (
        <form onSubmit={findEateries}>
          <h2 className="fw-bold text-decoration-underline mt-3 group-settings-text">Group Settings</h2>
          <div>
            <label className="me-3 mt-5 fw-bold fs-5 group-settings-text">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <Button variant="secondary" size="lg" onClick={() => pasteAddress(geoLocation)} className="shadow ms-3 get-location-button"> 
            Get Location 
            </Button>
          </div>
          <div>
            <label className="me-3 mt-3 fs-5 fw-bold group-settings-text">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
        <h1> <Loader message="Waiting for host..."/> </h1>
      )}
    </div>
  );
};

export default GroupSettings;
