import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const LoadingState = () => {
  const [loadingColor, setLoadingColor] = useState("primary");

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadingColor === "primary"
        ? setLoadingColor("secondary")
        : setLoadingColor("primary");
    }, 350);
    return () => clearInterval(intervalId);
  });

  return (
    <Box
      py={3}
      sx={{
        width: "100%",
        minHeight: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        variant="indeterminate"
        size="2.5rem"
        color={loadingColor}
      />
    </Box>
  );
};

export default LoadingState;
