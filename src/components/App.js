import React, { useEffect, useState } from "react";

const App = () => {
  useEffect(() => {
    let map = tt.map({
      key: process.env.React_App_Tom_Tom_Api_Key,
      container: mapElement,
    });
  }, []);
  return (
    <div>
      <h1>Hello Wolrd</h1>
    </div>
  );
};

export default App;
