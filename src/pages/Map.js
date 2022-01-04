import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {
  Typography,
  IconButton,
  Slide,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { blue } from "@mui/material/colors";
import React, { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { LoginContext } from "../contexts/LoginContext";
import mapmarker from "../map-marker.png";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVsc2lvIiwiYSI6ImNrdXF1ZnE3ZTFscTIzMXAxMXNrczJrdjAifQ.9nE1j10j1hd4EWXc6kGlRQ";

const Map = () => {
  const controls = new mapboxgl.NavigationControl();
  const { currentOwner } = useContext(LoginContext);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(124.665);
  const [lat, setLat] = useState(12.5096);
  const [zoom, setZoom] = useState(16.1);
  const history = useHistory();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isEditCoordinates, setIsEditCoordinates] = useState(false);

  const [severity, setSeverity] = useState("warning");

  const [alertMessage, setAlertmessage] = useState("");
  const [showMessageAlert, setShowMessageAlert] = useState(false);

  const [geojson, setGeojson] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const BOUNDS = [
    [124.2389, 11.8762], // southwest coordinates
    [125.368, 12.9979], //northeast coordinates
  ];

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // darkmode
      // style: "mapbox://styles/mapbox/navigation-night-v1?optimize=true",
      // lightmode
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/melsio/ckxh2zv6w0izd14npfm5p9cn5",

      // style: "mapbox://styles/mapbox/light-v10?optimize=true",
      center: [lng, lat],
      zoom: zoom,
      // pitch: 30,
      // bearing: -17.6,
      antialias: true,
      maxBounds: BOUNDS,
    });

    const abortCont = new AbortController();
    fetch(
      `http://localhost:3500/api/boarding-houses/owner-map/map-marks/${currentOwner.id}`,
      {
        signal: abortCont.signal,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        setGeojson(data);
        setLongitude(data.features[0].geometry.coordinates[0]);
        setLatitude(data.features[0].geometry.coordinates[1]);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          console.log("ready");
        }
      });

    map.current.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            // 'fill-extrusion-color': '#aaa',
            // "fill-extrusion-color": "#ffd400",
            "fill-extrusion-color": "#ffa726",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 3000,
        },
        trackUserLocation: true,
        showUserLocation: true,
        showUserHeading: true,
      })
    );
    map.current.addControl(
      new mapboxgl.FullscreenControl({
        container: mapContainer.current,
      })
    );

    map.current.addControl(controls, "bottom-right");
  });

  useEffect(() => {
    geojson.features.forEach(function (marker) {
      const el = document.createElement("div");
      el.innerHTML = `<img src="${mapmarker}"/>`;
      el.className = "marker";

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({
            offset: 20,
            closeButton: false,
          })
            .setHTML(`<h6>&#160; &#160;${marker.properties.title}&#160; &#160;</h6>
            <p>My Boarding House</p>
        <h5>${marker.properties.description}</h5>
       `)
        )
        .addTo(map.current);
    });
  }, [geojson]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const setNewCoordinates = () => {
    setIsEditCoordinates(!isEditCoordinates);
    document.getElementsByClassName("marker")[0].remove();

    fetch(
      `http://localhost:3500/api/boarding-houses/owner-map/update-coordinates/${currentOwner.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          newLongitude: longitude,
          newLatitude: latitude,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAlertmessage(data.message);
        setShowMessageAlert(true);
        setSeverity("success");

        const abortCont = new AbortController();
        fetch(
          `http://localhost:3500/api/boarding-houses/owner-map/map-marks/${currentOwner.id}`,
          {
            signal: abortCont.signal,
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw Error("Something went wrong!");
            }
            return res.json();
          })
          .then((data) => {
            setGeojson(data);
          })
          .catch((err) => {
            if (err.name === "AbortError") {
              console.log("fetch aborted");
            } else {
              console.log("ready");
            }
          });
        // setTimeout(() => {
        //   window.location.reload(false);
        // }, 350);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (showMessageAlert) {
        setShowMessageAlert(false);
      }
    }, 1000);
  }, [showMessageAlert]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
      maxWidth="xl"
      ref={mapContainer}
    >
      <AddIcon
        sx={{
          color: blue[700],
          zIndex: "1",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        fontSize="large"
      />

      <Slide in={true} direction="down">
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255, 0.6)",
            backdropFilter: "blur(1.5rem)",
            color: "#444",
            padding: ".6rem",
            zIndex: "1",
            position: "absolute",
            top: ".5rem",
            left: ".5rem",
            borderRadius: ".5rem",
            width: 280,
            boxShadow: "0 0 5px 1px rgba(0,0,0,0.2)",
            display: "flex",
          }}
        >
          <Box
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span
              style={{ width: "3px", height: "3px", background: "red" }}
            ></span>
            <span
              style={{ width: "3px", height: "3px", background: "red" }}
            ></span>
          </Box>
          <IconButton
            size="large"
            color="default"
            onClick={() => history.goBack()}
            style={{
              // position: "absolute",
              // top: -60,
              // left: 2,
              background: blue[700],
              boxShadow: "0 0 5px 1px rgba(0,0,0,0.2)",
              marginRight: 10,
            }}
          >
            <ArrowBackIcon sx={{ color: blue[50] }} />
          </IconButton>
          <Typography variant="caption" sx={{ userSelect: "text" }}>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </Typography>
        </Box>
      </Slide>
      <Slide in={true} direction="up">
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255, 0.6)",
            backdropFilter: "blur(1.5rem)",
            color: "#444",
            padding: ".6rem",
            zIndex: "100",
            position: "absolute",
            bottom: ".9rem",
            left: ".5rem",
            borderRadius: ".5rem",
            width: 280,
            boxShadow: "0 0 5px 1px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="caption"
            color="initial"
            align="center"
            sx={{ display: "block", mb: 1 }}
          >
            My Boarding House Location
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              id="longitude"
              label="Longitude"
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              size="small"
              disabled={!isEditCoordinates}
            />
            <TextField
              id="latitude"
              label="Latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              size="small"
              disabled={!isEditCoordinates}
            />
          </Box>
          {isEditCoordinates ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="text"
                size="small"
                fullWidth
                color="primary"
                disabled
                startIcon={<EditIcon />}
                sx={{ mt: 1 }}
                onClick={() => setIsEditCoordinates(!isEditCoordinates)}
              >
                edit
              </Button>
              <Button
                variant="text"
                size="small"
                fullWidth
                color="primary"
                startIcon={<SaveIcon />}
                sx={{ mt: 1 }}
                onClick={setNewCoordinates}
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="text"
                size="small"
                fullWidth
                color="secondary"
                startIcon={<EditIcon />}
                sx={{ mt: 1 }}
                onClick={() => setIsEditCoordinates(!isEditCoordinates)}
              >
                edit
              </Button>
              <Button
                variant="text"
                size="small"
                fullWidth
                color="primary"
                disabled
                startIcon={<SaveIcon />}
                sx={{ mt: 1 }}
                onClick={setNewCoordinates}
              >
                Save
              </Button>
            </Box>
          )}
          <Alert
            severity={severity}
            sx={
              showMessageAlert
                ? {
                    display: "flex",
                    mt: 2,
                  }
                : {
                    display: "none",
                    mt: 2,
                  }
            }
          >
            {alertMessage}
          </Alert>
        </Box>
      </Slide>
    </Box>
  );
};

export default Map;
