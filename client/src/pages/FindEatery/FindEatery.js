import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./FindEatery.css";
import { MapPin, Heart, X } from "phosphor-react";

import BACKEND_URL from "../../config";

const FindEatery = () => {
  let { location, term } = useParams(); // location is required, term is optional
  const [eateries, setEateries] = useState([]);
  const [displayedEatery, setDisplayedEatery] = useState(null);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [desiredEateries, setDesiredEateries] = useState([]);

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
  }, []);

  // Update currently displayed eatery whenever user decides to keep or skip the eatery
  useEffect(() => {
    if (eateries) {
      const nextEatery = eateries[0];
      setDisplayedEatery(nextEatery);
    }
  }, [eateries]);

  const addToList = () => {
    setDesiredEateries((desiredList) => [...desiredList, displayedEatery]);
    getNextEatery();
  };
  const skip = () => {
    getNextEatery();
  };
  const getNextEatery = () => {
    setEateries((prevEateries) =>
      prevEateries.filter((et) => et !== displayedEatery)
    );
  };

  // Render eatery information only when loaded, otherwise we get error from reading into field of undefined object
  if (!displayedEatery) {
    return <h1>Loading...</h1>;
  } else if (fetchErrorMessage) {
    return <h1>Error fetching eateries!</h1>;
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
