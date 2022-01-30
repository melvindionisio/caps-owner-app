import React from "react";
import { Paper, Typography, List } from "@mui/material";
import {
   yellow,
   orange,
   lime,
   green,
   blue,
   lightBlue,
} from "@mui/material/colors";

const DetailsCard = ({ title, children, colors }) => {
   return (
      <Paper
         elevation={0}
         variant="outlined"
         sx={{
            padding: 2,
            marginBottom: 1,
            paddingBottom: 0,
            // borderLeft: `5px solid ${amber[600]}`,
            // borderRadius: "0rem .5rem .5rem 0rem",
            borderRadius: 2,
         }}
      >
         <Typography
            variant="caption"
            color="text.secondary"
            // align="center"
            sx={{
               textTransform: "uppercase",
               fontFamily: "Quicksand",
               fontSize: 12,
               background: `linear-gradient(to bottom right, ${
                  colors === "green"
                     ? lime[500]
                     : colors === "blue"
                     ? lightBlue[300]
                     : yellow[400]
               }, ${
                  colors === "green"
                     ? green[500]
                     : colors === "blue"
                     ? blue[500]
                     : orange[500]
               })`,
               padding: ".2rem .4rem",
               borderRadius: 1,
               fontWeight: "bold",
            }}
         >
            {title}
         </Typography>
         <List>{children}</List>
      </Paper>
   );
};

export default DetailsCard;
