import "./ResultsPage.css";
import { MapPin } from "phosphor-react";

import Loader from "../../components/Loader";
import LoadingDisplay from "../../components/LoadingDisplay";
import ReviewStars from "../../components/ReviewStars";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../../config";

function ResultsPage() {
  const location = useLocation();
  const { eateryId, count } = location.state;

  const [resultEatery, setResultEatery] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      const URL = `${BACKEND_URL}/eatery/match?id=${id}`;
      const response = await fetch(URL);
      const data = await response.json();
      if (data.error) {
        console.log("Error from fetching...");
        console.log(`${data.error.code}: ${data.error.description}`);
      } else {
        setResultEatery(data);
      }
    };
    fetchData(eateryId);
  }, []);

  if (!resultEatery) {
    return <LoadingDisplay />;
  } else {
    const {
      name,
      image_url,
      display_phone,
      location,
      rating,
      review_count,
      categories,
      price,
      url: page_url,
    } = resultEatery;

    return (
      <div className="results-page-wrapper">
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
              <ReviewStars rating={rating} />
              <div>{price}</div>
              <div className="address">
                <MapPin size={20} />
                <span>{location.address1}</span>
              </div>
              <div>{display_phone}</div>
            </section>
          </div>
        </div>
        <a
          className="external-redirect-button mt-3 shadow w-25"
          href={page_url}
          target="_blank"
          rel="noreferrer noopener"
        >
          Eat Here!
        </a>
      </div>
    );
  }
}

export default ResultsPage;
