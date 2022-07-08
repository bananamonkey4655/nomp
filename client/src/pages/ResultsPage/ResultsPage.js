import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./ResultsPage.css";
import { MapPin } from "phosphor-react";
import BACKEND_URL from "../../config";
import LoadingDisplay from "../../components/LoadingDisplay/LoadingDisplay";

const ResultsPage = () => {
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
        console.log(data);
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
      url,
    } = resultEatery;

    return (
      <div>
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
                <span>Rating: {rating}/5</span>
              </div>
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
          className="external-redirect-button"
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          Eat here!
        </a>
      </div>
    );
  }
};

export default ResultsPage;
