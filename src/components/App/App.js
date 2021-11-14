import React, { useEffect, useState, useRef } from "react";
import "./App.css";

// Allow me to see The map using the Api and use It's custom Css
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
// Allow me to see route and easy close route prompt base on the distance and other Circustances
import * as ttApi from "@tomtom-international/web-sdk-services";

const App = () => {
  const [longitude, setLongitude] = useState(-0.112869);
  const [latitude, setLatitude] = useState(51.504);
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const convertToPoint = (longLat)=>{
    return {
      point:{
        latitude: longLat.lat, longitude: longLat.lng}}}
        
  useEffect(() => {
    const origin = {
      lng: longitude,
      lat:latitude
    }
    let map = tt.map({
      key: process.env.React_App_Tom_Tom_Api_Key,
      container: mapElement.current,
      stylesVisibility: { trafficIncidents: true, trafficFlow: true },
      center: [longitude, latitude],
      zoom: 14,
    });
    setMap(map);
    const addMarker = () => {
      const popOffSet = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popOffSet }).setHTML(
        "Here You're Yeison"
      );
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
      marker.setPopup(popup).togglePopup();
    };

    addMarker();
    const callParameter = {
      key: process.env.React_App_Tom_Tom_Api_Key,
      destination: {

      },
      origin: 
    };
    return new Promise((resolve, reject) => {
      ttApi.services.matrixRouting(callParameter);
    });

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
