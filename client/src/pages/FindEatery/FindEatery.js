import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./FindEatery.css";
import { MapPin, Heart, X } from "phosphor-react";

import BACKEND_URL from "../../config";
import { useSocket } from "../../context/SocketProvider";

const FindEatery = () => {
  let { location, term } = useParams(); // location is required, term is optional
  const navigate = useNavigate();

  const { socket, groupId, name } = useSocket();
  const [eateries, setEateries] = useState(null);
  const [displayedEatery, setDisplayedEatery] = useState(null);
  const [eateryIndex, setEateryIndex] = useState(0);
  // const [desiredEateries, setDesiredEateries] = useState([]);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [fetchErrorMessage, setFetchErrorMessage] = useState("");

  useEffect(() => {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    async function fetchData() {
      const response = await fetch(
        `${BACKEND_URL}/eatery/search?location=${location}&term=${
          term ? term : ""
        }`
      );
      const data = await response.json();
      if (data.error) {
        console.log("Error here");
        console.log(`${data.error.code}: ${data.error.description}`);
        setFetchErrorMessage(`${data.error.code}: ${data.error.description}`);
      } else {
        // shuffle(data.businesses);
        setEateries(data.businesses);
      }
    }

    fetchData();
    socket.on("show-results", ({ eateryId, count }) => {
      navigate("/gameover", { state: { eateryId, count } });
    });
  }, []);

  // Update currently displayed eatery whenever user decides to keep or skip the eatery
  useEffect(() => {
    if (eateries) {
      getNextEatery();
    }
  }, [eateries]);

  const addToList = () => {
    // setDesiredEateries((desiredList) => [...desiredList, displayedEatery]);
    socket.emit("add-desired-eatery", {
      eateryId: displayedEatery.id,
      roomId: groupId,
    });
    getNextEatery();
  };
  const skip = () => {
    getNextEatery();
  };
  const getNextEatery = () => {
    if (eateryIndex >= eateries.length) {
      setIsSearchComplete(true);
      socket.emit("member-completed-game", name);
    } else {
      setEateryIndex((prev) => (prev += 1));
      const nextEatery = eateries[eateryIndex];
      setDisplayedEatery(nextEatery);
    }
  };

  // Render eatery information only when loaded, otherwise we get error from reading into field of undefined object
  if (!displayedEatery) {
    return <h1>Loading...</h1>;
  } else if (fetchErrorMessage) {
    return <h1>Error fetching eateries!</h1>;
  } else if (isSearchComplete) {
    return <h1>Waiting for other members to complete search...</h1>;
  } else {
    const {
      name,
      rating,
      review_count,
      categories,
      image_url,
      location: place,
      display_phone,
      price,
    } = displayedEatery;

    return (
      <div className="wrapper">
        <h1>{`${eateryIndex}/${eateries.length} restaurants viewed`}</h1>
        <div className="container">
          <img src={image_url} />
          <div className="imagebox-text">
            <div className="empty-space"></div>
            <h1>{name}</h1>
            <h5>
              {categories
                .reduce((acc, curr) => acc + ", " + curr.title, "")
                .substring(1)}
            </h5>
            <section>
              <div>
                <span>Rating: {rating}</span>
              </div>
              <div>{price}</div>
              <div className="address">
                <MapPin size={20} />
                <span>{place.address1}</span>
              </div>
              <div></div>
            </section>
          </div>
        </div>
        <div className="buttons">
          <Heart
            className="want-button hover-effect"
            onClick={addToList}
            size={50}
            color="#f14a59"
            weight="fill"
          />
          <X
            className="skip-button hover-effect"
            onClick={skip}
            size={50}
            color="#5e5e5e"
            weight="bold"
          />{" "}
        </div>
      </div>
    );
  }
};

export default FindEatery;
