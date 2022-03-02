import React, { useState, useEffect } from "react";
import {
   Container,
   Card,
   Avatar,
   Typography,
   Box,
   ListItem,
   Divider,
   ListItemText,
   ListItemAvatar,
   IconButton,
   Chip,
} from "@mui/material";
import {
   amber,
   red,
   green,
   blue,
   grey,
   lightBlue,
   purple,
} from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import GradeIcon from "@mui/icons-material/Grade";
import DetailsCard from "../cards/DetailsCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/Edit";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Link as Nlink } from "@mui/material";
import { domain } from "../../fetch-url/fetchUrl";
import { useHistory } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles({
   avatar: {
      background: amber[700],
   },
   appbar: {
      padding: ".6rem .9rem",
      background: blue[600],
   },
   container: {
      padding: ".5rem",
      paddingTop: "1rem",
   },

   gradeIcon: {
      color: grey[200],
   },
   gradeIconActive: {
      color: amber[300],
   },
   toolbar: {
      display: "flex",
      justifyContent: "space-between",
   },
   icon: {
      color: blue[50],
   },

   infoCard: {
      border: "none",
      background: grey[100],
   },
   margin: {
      marginRight: "3px",
      marginLeft: "3px",
   },
   loaderContainer: {
      height: "100vh",
      width: "100vw",
      position: "absolute",
      top: "0",
      left: "0",
      display: "grid",
      placeItems: "center",
   },
});

const InfoItem = ({ icon, primaryText, secondaryText }) => {
   return (
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
         <ListItemAvatar>
            <Avatar sx={{ background: lightBlue[500] }}>{icon}</Avatar>
         </ListItemAvatar>
         <ListItemText
            primary={primaryText}
            secondary={secondaryText}
            sx={{
               ".MuiListItemText-primary": {
                  fontFamily: "Quicksand",
               },
            }}
         />
      </ListItem>
   );
};

const About = ({ boardinghouse }) => {
   const classes = useStyles();
   const history = useHistory();
   const { data: totalRoom } = useFetch(
      `${domain}/api/rooms/total/${boardinghouse.id}`
   );

   const [genderAllowed, setGenderAllowed] = useState();
   const [houseProtocols, setHouseProtocols] = useState();
   const [waterSource, setWaterSource] = useState();
   const [offers, setOffers] = useState();

   useEffect(() => {
      if (boardinghouse) {
         let offers = boardinghouse.offers;
         let offersArr = offers?.split("/");

         let waterSource = boardinghouse.waterSource;
         let waterSourceArr = waterSource?.split("/");

         let houseProtocols = boardinghouse.houseProtocols;
         let houseProtocolsArr = houseProtocols?.split("/");

         let genderAllowed = boardinghouse.genderAllowed;
         let genderAllowedArr = genderAllowed?.split("/");

         setGenderAllowed(genderAllowedArr);
         setHouseProtocols(houseProtocolsArr);
         setWaterSource(waterSourceArr);
         setOffers(offersArr);
      }
   }, [boardinghouse]);

   return (
      <Box
         sx={{
            height: "85vh",
            overflowY: "auto",
         }}
      >
         <Card
            sx={{
               borderRadius: 0,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               padding: 2,
               paddingTop: 5,
               position: "relative",
            }}
            elevation={0}
         >
            <Avatar
               sx={{
                  background: purple[400],
                  height: 110,
                  width: 110,
                  fontSize: 40,
                  fontWeight: "bold",
               }}
            >
               {boardinghouse.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontFamily: "Quicksand", mt: 1 }}>
               {boardinghouse.name}
            </Typography>
            <Box
               sx={{
                  display: "flex",
                  itemsCenter: "center",
               }}
            >
               <GradeIcon
                  fontSize="small"
                  className={`${classes.gradeIconActive} ${classes.margin}`}
               />
               <Typography variant="body2" color="textSecondary">
                  {boardinghouse.popularity || 0} stars
               </Typography>
            </Box>
            <Typography
               variant="body1"
               color="text.secondary"
               sx={{ mt: 2, fontStyle: "italic" }}
            >
               {boardinghouse.tagline}
            </Typography>
            <Box
               sx={{
                  mt: 2,
                  display: "flex",
                  gap: 1,
               }}
            >
               <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                     fontWeight: "bold",
                     border: `1px solid ${amber[500]}`,
                     px: 2,
                     py: 1,
                     borderRadius: 1,
                     background: amber[50],
                  }}
               >
                  Price Range:{"  "}
                  {boardinghouse.priceRange}
               </Typography>
               {totalRoom && (
                  <Typography
                     variant="caption"
                     color="text.secondary"
                     sx={{
                        fontWeight: "bold",
                        border: ` 1px solid ${green[500]}`,
                        background: green[50],
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                     }}
                  >
                     Total rooms: {"  "}
                     {totalRoom.total}
                  </Typography>
               )}
               <Box
                  variant="caption"
                  color="text.secondary"
                  sx={
                     boardinghouse.acceptingTransient === "yes"
                        ? {
                             border: `1px solid ${blue[500]}`,
                             background: blue[50],
                             px: 2,
                             py: 1,
                             borderRadius: 1,
                             display: "flex",
                             gap: 1,
                             alignItems: "center",
                          }
                        : {
                             border: `1px solid ${red[500]}`,
                             background: red[50],
                             px: 2,
                             py: 1,
                             borderRadius: 1,
                             display: "flex",
                             gap: 1,
                             alignItems: "center",
                          }
                  }
               >
                  {boardinghouse.acceptingTransient === "yes" ? (
                     <CheckCircleIcon />
                  ) : (
                     <CancelIcon />
                  )}
                  <Typography
                     variant="caption"
                     sx={{
                        fontWeight: "bold",
                        fontFamily: "Quicksand",
                     }}
                  >
                     {boardinghouse.acceptingTransient === "yes"
                        ? "Accepting termporary stay"
                        : "Not accepting termporary stay"}
                  </Typography>
               </Box>
            </Box>

            <IconButton
               size="large"
               onClick={() => history.push("/my/boarding-house/edit")}
               sx={{
                  // boxShadow: "inset 0px 0px 10px 1px rgba(0,0,0,0.09)",
                  position: "absolute",
                  top: ".5rem",
                  right: ".5rem",
               }}
            >
               <EditIcon />
            </IconButton>
         </Card>
         <Divider />

         <Container
            maxWidth="sm"
            disableGutters
            sx={{
               padding: 2,
               paddingBottom: "5rem",
            }}
         >
            <DetailsCard title="Owner">
               <InfoItem
                  icon={<PersonPinIcon />}
                  primaryText={boardinghouse.owner}
                  secondaryText={"Owner"}
               />
            </DetailsCard>

            <DetailsCard title="Contacts">
               <InfoItem
                  icon={<PhoneOutlinedIcon />}
                  primaryText={
                     <Nlink
                        underline="hover"
                        color="primary"
                        href={`tel: ${boardinghouse.contacts}`}
                     >
                        {boardinghouse.contacts}
                     </Nlink>
                  }
                  secondaryText={"Contact Number"}
               />
            </DetailsCard>

            <DetailsCard title="Location">
               <InfoItem
                  icon={<LocationOnIcon />}
                  primaryText={boardinghouse.completeAddress}
                  secondaryText={"Full Address"}
               />
               <InfoItem
                  icon={<GpsFixedIcon />}
                  primaryText={
                     <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontFamily: "Quicksand" }}
                     >
                        {boardinghouse.longitude}{" "}
                        <Typography variant="caption" color="text.secondary">
                           LNG
                        </Typography>{" "}
                        - {boardinghouse.latitude}{" "}
                        <Typography variant="caption" color="text.secondary">
                           LAT
                        </Typography>
                     </Typography>
                  }
                  secondaryText={"Coordinates"}
               />
            </DetailsCard>
            <DetailsCard title="Gender/s Allowed">
               <Box
                  sx={{
                     py: 1,
                     fontFamily: "Quicksand",
                     display: "flex",
                     flexWrap: "wrap",
                     gap: 1,
                  }}
               >
                  {genderAllowed &&
                     genderAllowed.map((gender, index) => (
                        <Chip
                           icon={<CheckCircleIcon />}
                           label={gender}
                           color="primary"
                           size="medium"
                           key={index}
                        />
                     ))}
               </Box>
            </DetailsCard>

            <DetailsCard title="House Protocols">
               <Box
                  sx={{
                     py: 1,
                     fontFamily: "Quicksand",
                     display: "flex",
                     flexWrap: "wrap",
                     gap: 1,
                  }}
               >
                  {houseProtocols &&
                     houseProtocols.map((protocol, index) => (
                        <Chip
                           icon={<CheckCircleIcon />}
                           label={protocol}
                           color="primary"
                           size="medium"
                           key={index}
                        />
                     ))}
               </Box>
            </DetailsCard>
            <DetailsCard title="We Offer">
               <Box
                  sx={{
                     py: 1,
                     fontFamily: "Quicksand",
                     display: "flex",
                     flexWrap: "wrap",
                     gap: 1,
                  }}
               >
                  {offers &&
                     offers.map((offer, index) => (
                        <Chip
                           icon={<CheckCircleIcon />}
                           label={offer}
                           color="primary"
                           size="medium"
                           key={index}
                        />
                     ))}
               </Box>
            </DetailsCard>

            <DetailsCard title="Water source">
               <Box
                  sx={{
                     py: 1,
                     fontFamily: "Quicksand",
                     display: "flex",
                     flexWrap: "wrap",
                     gap: 1,
                  }}
               >
                  {waterSource &&
                     waterSource.map((source, index) => (
                        <Chip
                           icon={<CheckCircleIcon />}
                           label={source}
                           color="primary"
                           size="medium"
                           key={index}
                        />
                     ))}
               </Box>
            </DetailsCard>
         </Container>
      </Box>
   );
};

export default About;
