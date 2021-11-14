import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const App = () => {
  const [longitude, setLongitude] = useState(-0.112869);
  const [latitude, setLatitude] = useState(51.504);
  const mapElement = useRef();
  const [map, setMap] = useState({});
  useEffect(() => {
    let map = tt.map({
      key: process.env.React_App_Tom_Tom_Api_Key,
      container: mapElement.current,
      stylesVisibility: { trafficIncidents: true, trafficFlow: true },
      center: [longitude, latitude],
      zoom: 14,
    });
    setMap(map);
    return () => map.remove();
  }, [latitude, longitude]);
  return (
    <div className="App">
      <div ref={mapElement} className="map"></div>
      <div className="search-bar">
        <h1>Where to?</h1>
        <input
          type="text"
          id="longitude"
          className="longitude"
          placeholder="Put in Longitude"
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
        />
        <input
          type="text"
          id="latitude"
          className="latitude"
          placeholder="Put in Latitude"
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default App;
