import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import BACKEND_URL from "../../config";

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

  if (resultEatery) {
    const { name } = resultEatery;

    return (
      <div>
        <h1>Results</h1>
        <h3>
          Winner is {name}/{eateryId}
        </h3>
        <h3>With a count of {count}</h3>
        <h3>Test</h3>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default ResultsPage;
