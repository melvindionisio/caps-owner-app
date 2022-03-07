import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import SideDrawer from "./SideDrawer";
import React from "react";

const useStyles = makeStyles({
   appbar: {
      background: grey[900],
      padding: ".3rem 0",
   },
   appbarcontent: {
      display: "flex",
      alignItems: "center",
   },

   icon: {
      color: "white",
   },
});
const NavbarDrawer = ({ title, children }) => {
   const classes = useStyles();
   return (
      <AppBar
         position="sticky"
         className={classes.appbar}
         elevation={2}
         // color="primary"
         sx={{ background: indigo[600] }}
      >
         <Toolbar
            disableGutters
            variant="densed"
            sx={{
               padding: "0 .5rem",
               paddingLeft: "1rem",
               display: "flex",
               justifyContent: "space-between",
               height: "3.5rem",
            }}
         >
            <SideDrawer />
            <Typography variant="body1">{title.toUpperCase()}</Typography>
            {children}
         </Toolbar>
      </AppBar>
   );
};

export default NavbarDrawer;
