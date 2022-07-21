import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Loader from "../components/Loader/Loader";
import "../styles/Voting.css";
import { MapPin, Heart, X } from "phosphor-react";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import LoadingDisplay from "../components/LoadingDisplay";
import { BACKEND_URL } from "../config";
import ToggleButton from 'react-bootstrap/ToggleButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Eatery from "../../components/Eatery/Eatery";

const Voting = () => {
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
      transition: { ease: "easeInOut", duration: 0.5 },
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
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  const { location, searchTerm: term, budget } = useLocation().state; // location is required, term is optional
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { name, groupId } = socket;

  const [eateries, setEateries] = useState(null);
  const [displayedEatery, setDisplayedEatery] = useState(null);
  const [eateryIndex, setEateryIndex] = useState(0);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  const [fetchErrorMessage, setFetchErrorMessage] = useState("");

  const [viewMoreDetails, setViewMoreDetails] = useState(false);

  useEffect(() => {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    async function fetchData() {
      // console.log(location, term, budget);
      const response = await fetch(
        `${BACKEND_URL}/eatery/search?location=${location}&term=${term}&budget=${budget}`
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
    // framer-motion rotate left
    controls.start({
      rotate: [0, -15, 0],
      transition: { duration: 0.5 },
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
      rotate: [0, 15, 0],
      transition: { duration: 0.5 },
    });
    // remove buttons during animation
    noButtons();
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

    // for toggle button to view more details
    const [toggle, setToggle] = useState(false);

    // for rendering extra info about the toggle button
    const renderInfo = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        More information loaded. Longer loading time.
      </Tooltip>
    );

  // Render eatery information only when loaded, otherwise we get error from reading into field of undefined object

  if (fetchErrorMessage) {
    return <h1>Error fetching eateries!</h1>;
  } else if (!displayedEatery) {
    return (
      <h1>
        <Loader message="Loading" />
      </h1>
    );
  } else if (isSearchComplete) {
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
      id
    } = displayedEatery;

    return (
      <div className="wrapper">
        <h1 className="text-restaurants fw-bold fs-1">{`${eateryIndex}/${eateries.length} Restaurants Viewed`}</h1>
        {!viewMoreDetails && <motion.div variants={animationVariants} animate={controls} className="container mt-3">
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
        </motion.div>}

        {viewMoreDetails && <Eatery key={id} id={id}/>}

        <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderInfo}
        >
        <ToggleButton
        className="my-3 fw-bold font-style"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={toggle}
        value="1"
        onChange={(e) => {
          setToggle(e.currentTarget.checked);
          setViewMoreDetails(!viewMoreDetails);
          }}>
          Toggle Me to view more details
        </ToggleButton>
        </OverlayTrigger>

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
};

export default Voting;
