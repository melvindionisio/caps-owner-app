import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Typography, IconButton, Slide } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";
import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVsc2lvIiwiYSI6ImNrdXF1ZnE3ZTFscTIzMXAxMXNrczJrdjAifQ.9nE1j10j1hd4EWXc6kGlRQ";

const Map = () => {
  const controls = new mapboxgl.NavigationControl();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(124.665);
  const [lat, setLat] = useState(12.5096);
  const [zoom, setZoom] = useState(16.1);
  const history = useHistory();

  const BOUNDS = [
    [124.2389, 11.8762], // southwest coordinates
    [125.368, 12.9979], //northeast coordinates
  ];

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [124.6652, 12.5111],
        },
        properties: {
          title: "Boarding House",
          description: "UEP Men's Dorm",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [124.665, 12.5109],
        },
        properties: {
          title: "Boarding House",
          description: "UEP Women's Dorm",
        },
      },
    ],
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // darkmode
      // style: "mapbox://styles/mapbox/navigation-night-v1?optimize=true",
      // lightmode
      style: "mapbox://styles/mapbox/streets-v11",
      // style: "mapbox://styles/mapbox/light-v10?optimize=true",
      center: [lng, lat],
      zoom: zoom,
      pitch: 30,
      // bearing: -17.6,
      antialias: true,
      maxBounds: BOUNDS,
    });

    geojson.features.forEach(function (marker) {
      const el = document.createElement("div");
      el.innerHTML = `<img src="https://img.icons8.com/color-glass/48/000000/apartment.png"/>`;
      el.className = "marker";

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({
            offset: 20,
            closeButton: false,
          })
            .setHTML(`<h6>&#160; &#160;${marker.properties.title}&#160; &#160;</h6>
            <h5>${marker.properties.description}</h5>
           `)
        )
        .addTo(map.current);
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
            "fill-extrusion-color": "#ffd400",

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
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

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
          <Typography variant="caption">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </Typography>
        </Box>
      </Slide>
    </Box>
  );
};

export default Map;
