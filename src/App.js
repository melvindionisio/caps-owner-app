import React from "react";
import { Container, Hidden } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, pink, grey, blueGrey } from "@mui/material/colors";
import Routes from "./Routes";

import LoginContextProvider from "./contexts/LoginContext";
import Sidebar from "./components/Sidebar";
//import OwnerBottomNavigation from "./components/BottomNavigation";

const useStyles = makeStyles({
   mainContainer: {
      overflow: "hidden",
      height: "100vh",
      display: "flex",
      background: grey[100],
      position: "relative",
      width: "100vw",
   },
   page: {
      background: blueGrey[50],
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      position: "relative",
   },
   permanentDrawer: {
      width: 250,
      flexShrink: 0,
      boxShadow: "3px 0px 5px rgba(0,0,0,0.2)",
   },
   drawerPaper: {
      width: 250,
   },
});

const theme = createTheme({
   palette: {
      // mode: "dark",
      primary: {
         main: blue[500],
      },
      secondary: {
         main: pink[600],
      },
   },
   typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
   },
   spacing: 8,
});

const App = () => {
   const classes = useStyles();

   return (
      <ThemeProvider theme={theme}>
         <LoginContextProvider>
            <Container
               disableGutters
               className={classes.mainContainer}
               sx={{
                  display: "flex",
               }}
               maxWidth="xl"
            >
               <Router>
                  <Hidden mdDown>
                     <Sidebar />
                  </Hidden>
                  {/*
                  <OwnerBottomNavigation />
                  */}
                  <Routes />
               </Router>
            </Container>
         </LoginContextProvider>
      </ThemeProvider>
   );
};

export default App;
