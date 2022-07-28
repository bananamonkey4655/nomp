import styles from "./Voting.module.css";
import { MapPin, Heart, X } from "phosphor-react";

import Loader from "components/Loader";
import ReviewStars from "components/ReviewStars";
import ExitGroupButton from "components/ExitGroupButton";
import Eatery from "../../components/Eatery/Eatery";
import ToggleButton from "react-bootstrap/ToggleButton";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "context/SocketProvider";
import shuffleArray from "utils/shuffleArray";
import { BACKEND_URL } from "config";

function Voting() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { name, groupId } = socket;
  const { location, query, budget, coordinates, radius } = useLocation().state; // location is required field

  const [eateries, setEateries] = useState(null);
  const [eateryIndex, setEateryIndex] = useState(0);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [error, setError] = useState("");

  const [viewMoreDetails, setViewMoreDetails] = useState(false);
  const [toggle, setToggle] = useState(false);

  // for rendering extra info about the toggle button
  const renderInfo = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      More information loaded. Longer loading time.
    </Tooltip>
  );

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
    socket.emit("increment-eatery-vote", {
      eateryId: eateries[eateryIndex].id,
      roomId: groupId,
    });
    setEateryIndex((prev) => prev + 1);
  };

  const skipEatery = () => {
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
    categories,
    distance,
    id,
    image_url,
    location: place,
    name: restaurant_name,
    price,
    rating,
  } = displayedEatery;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h1 className={styles.viewCount}>
            <strong>{`${eateryIndex + 1}/${eateries.length}`}</strong>
            <span>Restaurants Viewed</span>
          </h1>
          <div className={styles.sidebarContent}></div>
          <ExitGroupButton />
        </div>

        <div className={styles.mainContent}>
          {viewMoreDetails ? (
            <Eatery key={id} id={id} />
          ) : (
            <div className={styles.restaurantContainer}>
              <div
                className={styles.imageContainer}
                style={{ backgroundImage: `url(${image_url})` }}
              />
              <article className={styles.restaurantInfo}>
                <div className={styles.space}></div>
                <h1>{restaurant_name}</h1>

                <section className={styles.description}>
                  <ReviewStars rating={rating} />
                  <div>
                    <span>{price}</span>
                    <span>
                      &#183;
                      {categories
                        .reduce((acc, curr) => acc + ", " + curr.title, "")
                        .substring(1)}
                    </span>
                  </div>
                  <div className={styles.address}>
                    <MapPin size={20} />
                    <span>{place.address1}</span>
                    {distance && (
                      <span> &#183; {Math.round(distance / 1000)} km away</span>
                    )}
                  </div>
                </section>
              </article>
            </div>
          )}

          <div className={styles.buttons}>
            <div className={styles.toggleGroup}>
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
                  }}
                >
                  Toggle Me to view more details
                </ToggleButton>
              </OverlayTrigger>
            </div>
            <div className={styles.voteBtnGroup}>
              <button>
                <Heart
                  className="want-button hover-effect"
                  onClick={addEateryToDesired}
                  size={50}
                  color="#f14a59"
                  weight="fill"
                />
              </button>
              <button>
                <X
                  className="skip-button hover-effect"
                  onClick={skipEatery}
                  size={50}
                  color="#5e5e5e"
                  weight="bold"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voting;
