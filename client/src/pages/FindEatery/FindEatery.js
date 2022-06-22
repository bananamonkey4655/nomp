import "./FindEatery.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BACKEND_URL from "../../config";
import { useSocket } from "../../context/SocketProvider";

const FindEatery = () => {
  let { location, term } = useParams(); // location is required, term is optional
  const [eateries, setEateries] = useState([]);
  const [displayedEatery, setDisplayedEatery] = useState(null);
  const [fetchErrorMessage, setFetchErrorMessage] = useState("");
  const [desiredEateries, setDesiredEateries] = useState([]);

  // Fetch the list of eateries from API using given filters when component first mounts
  useEffect(() => {
    // Knuth shuffle algorithm
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
        shuffle(data.businesses);
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
      categories,
      image_url,
      location: place,
      display_phone,
      price,
    } = displayedEatery;

    // temporary styles
    return (
      <div className="wrapper">
        <div className="card-container">
          <div className="card-imagebox">
            <img className="imagebox-image" src={image_url} />
            <div className="imagebox-text">
              <h1>{name}</h1>
              <h3>{categories[0]?.title}</h3>
            </div>
          </div>
          <div className="card-description">
            <p>{`${place.address1} ${place.address2} ${place.address3}`}</p>
            <p>{display_phone ? display_phone : null}</p>
            <span className="price">{price}</span>
            <div className="buttons">
              <button onClick={want} style={{ color: "green" }}>
                Eat here!
              </button>
              <button onClick={skip} style={{ color: "red" }}>
                Skip!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FindEatery;
