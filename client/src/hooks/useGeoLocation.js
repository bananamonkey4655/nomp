import { useEffect, useState } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { latitude: "", longitude: "" },
  });

  const onSuccess = (pos) => {
    const crd = pos.coords;

    setLocation({
      loaded: true,
      coordinates: {
        latitude: crd.latitude,
        longitude: crd.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}

export default useGeoLocation;
