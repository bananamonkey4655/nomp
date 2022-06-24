import "./FindEatery.css";
import { MapPin, Heart, X } from "phosphor-react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BACKEND_URL from "../../config";

const FindEatery = () => {
  let { location, term } = useParams(); // location is required, term is optional
  const [eateries, setEateries] = useState([]);
  const [displayedEatery, setDisplayedEatery] = useState(null);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [desiredEateries, setDesiredEateries] = useState([]);

  // Fetch the list of eateries from API using given filters when component first mounts
  useEffect(() => {
    // Knuth shuffle
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    async function fetchData() {
      // Note: Seems to be the case that if location string is gibberish, then Yelp API searches for location=Singapore by default (because "Singapore" string appended to URL in our backend)
      // First result would be 'Gardens by the Bay'
      const response = await fetch(
        `${BACKEND_URL}/eatery/search?location=${location}&term=${
          term ? term : "" //check if term is falsy, otherwise URL in fetch would be ...&term=undefined
        }`
      );
      const data = await response.json();
      if (data.error) {
        console.log("Error here");
        console.log(`${data.error.code}: ${data.error.description}`);
        setFetchErrorMessage(`${data.error.code}: ${data.error.description}`);
      } else {
        // shuffle(data.businesses);
        setEateries(data.businesses); //note that setting state is asynchronous
        console.log(data.businesses);
      }
    }

    fetchData();
  }, []);

  // Update currently displayed eatery whenever user decides to keep or skip the eatery
  useEffect(() => {
    if (eateries) {
      const nextEatery = eateries[0];
      setDisplayedEatery(nextEatery); //currently sets eatery to 1st one
    }
  }, [eateries]);

  // temporary names
  const want = () => {
    setDesiredEateries((desiredList) => [...desiredList, displayedEatery]);
    getRandomNewEatery();
    console.log(desiredEateries);
  };
  const skip = () => {
    getRandomNewEatery();
  };
  const getRandomNewEatery = () => {
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
            <h1>{name}</h1>
            <p>
              <div>
                <span>Rating: {rating}</span>
              </div>
              <div>{price}</div>
              <div className="address">
                <MapPin size={20} />
                <span>{place.address1}</span>
              </div>
              <div></div>
            </p>
          </div>
        </div>
        <div className="buttons">
          <Heart
            className="want-button hover-effect"
            onClick={want}
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
