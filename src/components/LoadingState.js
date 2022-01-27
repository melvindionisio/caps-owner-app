import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const LoadingState = ({ loadWhat }) => {
   const [loadingColor, setLoadingColor] = useState("primary");
   const loadTitle = loadWhat
      ? loadWhat.toLowerCase().charAt(0).toUpperCase() + loadWhat.slice(1)
      : "";

   useEffect(() => {
      const intervalId = setInterval(() => {
         loadingColor === "primary"
            ? setLoadingColor("secondary")
            : setLoadingColor("primary");
      }, 300);
      return () => clearInterval(intervalId);
   });

   return (
      <Box
         py={3}
         sx={{
            width: "100%",
            minHeight: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
         }}
      >
         <CircularProgress
            // variant="indeterminate"
            size="2.5rem"
            color={loadingColor}
            sx={{ width: 150 }}
         />
         <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mt: 2, fontSize: ".8rem" }}
         >
            Loading {loadTitle} ...
         </Typography>
      </Box>
   );
};

export default LoadingState;
