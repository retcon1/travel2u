import { useEffect, useRef, useState } from "react";

import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const Map = ({ weatherData }) => {
  const mapElement = useRef();

  const mapLongitude = weatherData.coords.long;
  const mapLatitude = weatherData.coords.lat;
  const mapZoom = 10;
  const [map, setMap] = useState({});

  useEffect(() => {
    let map = tt.map({
      key: "wf8rgFjkLAyVg8dJUVAhcwlzqFtjkrxK",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(map);
    return () => map.remove();
  }, [weatherData]);

  return (
    <>
      <div ref={mapElement} className="map" />
    </>
  );
};

export default Map;
