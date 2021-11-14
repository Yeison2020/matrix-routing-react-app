import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
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
    const addMarker = () => {
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
      marker.on("dragend", () => {
        const longLat = marker.getLngLat();
        setLongitude(longLat.lng);
        setLatitude(longLat.lat);
      });
    };
    addMarker();
    return () => map.remove();
  }, [latitude, longitude]);
  return (
    <React.Fragment>
      {map && (
        <div className="app">
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
      )}
    </React.Fragment>
  );
};

export default App;
