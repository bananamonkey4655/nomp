import "./Voting.css";
import { MapPin, Heart, X } from "phosphor-react";

import Loader from "components/Loader";
import LoadingDisplay from "components/LoadingDisplay";
import ReviewStars from "components/ReviewStars";
import ExitGroupButton from "components/ExitGroupButton";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";
// import { AnimatePresence, motion, useAnimation } from "framer-motion";
import shuffleArray from "utils/shuffleArray";
import { BACKEND_URL } from "config";

function Voting() {
  // const controls = useAnimation();

  // const [isAnimation, setIsAnimation] = useState(false);
  // function noButtons() {
  //   setIsAnimation(true);
  //   setTimeout(() => setIsAnimation(false), 600);
  // }

  // // findeaterypage variant
  // const pageVariants = {
  //   //exit: {
  //   //  opacity: 0,
  //   //  transition: { duration : 0.5}
  //   //},
  //   exit: {
  //     x: "-100vw",
  //     transition: { ease: "easeInOut", duration: 0 },
  //   },
  // };

  // //fling left or right animation
  // const animationVariants = {
  //   initial: {
  //     x: 0,
  //     y: 0,
  //   },
  //   flingleft: {
  //     x: "-10vw",
  //     transition: {
  //       duration: 0,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  const navigate = useNavigate();
  const { socket } = useSocket();
  const { name, groupId } = socket;
  const { location, query, budget, coordinates, radius } = useLocation().state; // location is required field

  const [eateries, setEateries] = useState(null);
  const [eateryIndex, setEateryIndex] = useState(0);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [error, setError] = useState("");

  const displayedEatery = eateries?.[eateryIndex];

  // Fetch restaurants data and listen for event denoting end of game
  useEffect(() => {
    async function fetchData() {
      let URL = `${BACKEND_URL}/eatery/search?location=${location}&query=${query}&budget=${budget}&radius=${radius}`;

      if (coordinates) {
        URL += `&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`;
      }

      const response = await fetch(URL);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }
      // const shuffledRestaurants = shuffleArray(data.businesses);
      setEateries(data.businesses);
    }

    fetchData();

    socket.on("show-results", ({ eateryId, count }) => {
      navigate("/gameover", { state: { eateryId, count } });
    });

    return () => {
      socket.off("show-results");
    };
  }, []);

  // Check for whether search has been completed
  useEffect(() => {
    if (!eateries) {
      return;
    }

    if (eateryIndex >= eateries.length) {
      setIsSearchComplete(true);
      socket.emit("user-voting-complete");
    }
  }, [eateryIndex]);

  const addEateryToDesired = () => {
    // framer-motion rotate left
    // controls.start({
    //   rotate: [0, 0, 0],
    //   transition: { duration: 0 },
    // });
    // // remove buttons during animation
    // noButtons();
    socket.emit("increment-eatery-vote", {
      eateryId: eateries[eateryIndex].id,
      roomId: groupId,
    });
    setEateryIndex((prev) => prev + 1);
  };

  const skipEatery = () => {
    //framer-motion rotate right
    // controls.start({
    //   rotate: [0, 0, 0],
    //   transition: { duration: 0 },
    // });
    // remove buttons during animation
    // noButtons();
    setEateryIndex((prev) => prev + 1);
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isSearchComplete) {
    return (
      <h1>
        <Loader message="Waiting for other members to complete search..." />
      </h1>
    );
  }

  if (!displayedEatery) {
    return (
      <h1>
        <Loader message="Loading" />
      </h1>
    );
  }

  const {
    name: restaurant_name,
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
      <ExitGroupButton />
      <h1 className="text-restaurants fw-bold fs-1">{`${eateryIndex + 1}/${
        eateries.length
      } Restaurants Viewed`}</h1>
      <div
        // variants={animationVariants}
        // animate={controls}
        className="container mt-3"
      >
        <img className="container-img" src={image_url} />
        <div className="imagebox-text">
          <div className="empty-space"></div>
          <h1>{restaurant_name}</h1>
          <h5>
            {categories
              .reduce((acc, curr) => acc + ", " + curr.title, "")
              .substring(1)}
          </h5>
          <section>
            <ReviewStars rating={rating} />
            <div>{price}</div>
            <div className="address">
              <MapPin size={20} />
              <span>{place.address1}</span>
            </div>
            <div></div>
          </section>
        </div>
      </div>
      <div className="buttons mt-5">
        {/* {!isAnimation && ( */}
        <Heart
          className="want-button hover-effect"
          onClick={addEateryToDesired}
          size={50}
          color="#f14a59"
          weight="fill"
        />
        {/* )} */}
        {/* {!isAnimation && ( */}
        <X
          className="skip-button hover-effect"
          onClick={skipEatery}
          size={50}
          color="#5e5e5e"
          weight="bold"
        />
        {/* )}{" "} */}
      </div>
    </div>
  );
}

export default Voting;
