import React from "react";
import { Container, Typography, Box, Tooltip, Zoom } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

import NavbarDrawer from "../components/NavbarDrawer";
import AccountMenu from "../components/AccountMenu";
import LoadingState from "../components/LoadingState";

import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/styles";
import About from "../components/SwipablePages/About";
import Reviews from "../components/SwipablePages/Reviews";

import InfoIcon from "@mui/icons-material/Info";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { domain } from "../fetch-url/fetchUrl";

const useStyles = makeStyles({
   scrollContainer: {
      padding: ".5rem",
      paddingTop: "1rem",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: "100vh",
   },
   cardHeader: {
      paddingBottom: "0px",
   },
   toolbar: {
      display: "flex",
      justifyContent: "space-between",
   },
   appbar: {
      padding: "0 0 0rem 0rem",
      background: "white",
   },
   header: {
      color: grey[800],
   },
   informationContainer: {
      marginTop: 4,
      marginBottom: 4,
   },
   cardheader: {
      marginBottom: 0,
   },
   cardcontent: {
      paddingTop: 0,
   },
   roomButtonsContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: ".5rem",
   },
});

function TabPanel(props) {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && <Box>{children}</Box>}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
   };
}

const Home = () => {
   const classes = useStyles();
   const { currentOwner } = useContext(LoginContext);
   const {
      data: myBoardinghouse,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/by-owner/${currentOwner.id}`);
   const theme = useTheme();
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const handleChangeIndex = (index) => {
      setValue(index);
   };

   function NavigationTabs() {
      return (
         <Tabs
            sx={{
               borderBottom: "1px solid rgba(0,0,0,0.2)",
               "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: "1.5rem 1.5rem 0 0 ",
               },
            }}
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs"
         >
            <Tooltip
               title="About Boarding House"
               TransitionComponent={Zoom}
               enterDelay={1000}
            >
               <Tab icon={<InfoIcon />} {...a11yProps(0)} />
            </Tooltip>
            <Tooltip
               title="Reviews"
               TransitionComponent={Zoom}
               enterDelay={1000}
            >
               <Tab icon={<ReviewsIcon />} {...a11yProps(1)} />
            </Tooltip>
         </Tabs>
      );
   }

   return (
      // <Slide in={true} direction="right">
      <Container disableGutters className={classes.container} maxWidth="xl">
         {/* <HomeNavigation /> */}
         <NavbarDrawer title="My Boarding House">
            <AccountMenu />
         </NavbarDrawer>

         <NavigationTabs />
         {error && (
            <Typography variant="body1" textAlign="center" color="initial">
               {error}
            </Typography>
         )}
         {isPending && <LoadingState />}
         {myBoardinghouse && (
            <SwipeableViews
               axis={theme.direction === "rtl" ? "x-reverse" : "x"}
               index={value}
               onChangeIndex={handleChangeIndex}
            >
               <TabPanel value={value} index={0} dir={theme.direction}>
                  <About boardinghouse={myBoardinghouse} />
               </TabPanel>

               <TabPanel value={value} index={1} dir={theme.direction}>
                  <Reviews boardinghouse={myBoardinghouse} />
               </TabPanel>
            </SwipeableViews>
         )}
      </Container>
      // </Slide>
   );
};

export default Home;
