import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
