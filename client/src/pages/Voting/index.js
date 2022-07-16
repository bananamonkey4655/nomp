import "./Voting.css";
import { MapPin, Heart, X } from "phosphor-react";

import Loader from "../../components/Loader";
import LoadingDisplay from "../../components/LoadingDisplay";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import shuffleArray from "../../utils/shuffleArray";
import { BACKEND_URL } from "../../config";

function Voting() {
  const controls = useAnimation();

  const [isAnimation, setIsAnimation] = useState(false);
  function noButtons() {
    setIsAnimation(true);
    setTimeout(() => setIsAnimation(false), 600);
  }

  // findeaterypage variant
  const pageVariants = {
    //exit: {
    //  opacity: 0,
    //  transition: { duration : 0.5}
    //},
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: 0 },
    },
  };

  //fling left or right animation
  const animationVariants = {
    initial: {
      x: 0,
      y: 0,
    },
    flingleft: {
      x: "-10vw",
      transition: {
        duration: 0,
        ease: "easeInOut",
      },
    },
  };

  const { location, query, budget, coordinates, radius } = useLocation().state; // location is required, query is optional
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { name, groupId } = socket;

  const [eateries, setEateries] = useState(null);
  const [displayedEatery, setDisplayedEatery] = useState(null);
  const [eateryIndex, setEateryIndex] = useState(0);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const URL = `${BACKEND_URL}/eatery/search?location=${location}&query=${query}&budget=${budget}&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&radius=${radius}`;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.error) {
        setError(`${data.error.code}: ${data.error.description}`);
      } else {
        // const shuffledRestaurants = shuffleArray(data.businesses);
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
    // framer-motion rotate left
    controls.start({
      rotate: [0, 0, 0],
      transition: { duration: 0 },
    });
    // remove buttons during animation
    noButtons();
    // setDesiredEateries((desiredList) => [...desiredList, displayedEatery]);
    socket.emit("add-desired-eatery", {
      eateryId: displayedEatery.id,
      roomId: groupId,
    });
    getNextEatery();
  };

  const skip = () => {
    //framer-motion rotate right
    controls.start({
      rotate: [0, 0, 0],
      transition: { duration: 0 },
    });
    // remove buttons during animation
    noButtons();
    getNextEatery();
  };

  const getNextEatery = () => {
    if (eateryIndex >= eateries.length) {
      setIsSearchComplete(true);
      socket.emit("member-completed-game", name);
      return;
    }
    setEateryIndex((prev) => prev + 1);
    const nextEatery = eateries[eateryIndex];
    setDisplayedEatery(nextEatery);
  };

  if (error) {
    return <h1>Error fetching eateries!</h1>;
  }

  if (!displayedEatery) {
    return (
      <h1>
        <Loader message="Loading" />
      </h1>
    );
  }

  if (isSearchComplete) {
    return (
      <h1>
        <Loader message="Waiting for other members to complete search..." />
      </h1>
    );
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
        <h1 className="text-restaurants fw-bold fs-1">{`${eateryIndex}/${eateries.length} Restaurants Viewed`}</h1>
        <motion.div
          variants={animationVariants}
          animate={controls}
          className="container mt-3"
        >
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
        </motion.div>
        <div className="buttons mt-5">
          {!isAnimation && (
            <Heart
              className="want-button hover-effect"
              onClick={addToList}
              size={50}
              color="#f14a59"
              weight="fill"
            />
          )}
          {!isAnimation && (
            <X
              className="skip-button hover-effect"
              onClick={skip}
              size={50}
              color="#5e5e5e"
              weight="bold"
            />
          )}{" "}
        </div>
      </div>
    );
  }
}

export default Voting;
