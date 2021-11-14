import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const App = () => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  useEffect(() => {
    let map = tt.map({
      key: process.env.React_App_Tom_Tom_Api_Key,
      container: mapElement.current,
    });
    setMap(map);
  }, []);
  return (
    <div className="App">
      <div ref={mapElement} className="map"></div>
    </div>
  );
};

export default App;
