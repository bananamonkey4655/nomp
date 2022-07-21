import { useEffect, useState } from "react";

function useFetch(url, options = {}) {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  return { response, isLoading, error };
}

export default useFetch;
