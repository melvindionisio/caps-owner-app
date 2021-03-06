import React from "react";
import {
   Container,
   Typography,
   Card,
   CardContent,
   TextField,
   InputLabel,
   FormControl,
   Select,
   Box,
   MenuItem,
   Button,
   Radio,
   RadioGroup,
   FormControlLabel,
   FormLabel,
   Divider,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import NavbarDrawer from "../components/NavbarDrawer";
import AccountMenu from "../components/AccountMenu";
import LoadingState from "../components/LoadingState";

import useFetch from "../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useHistory, Link } from "react-router-dom";
import { domain } from "../fetch-url/fetchUrl";
import Notification from "../components/Notification";

const Section = ({ title, children }) => {
   return (
      <>
         <Typography
            color="text.secondary"
            variant="body1"
            component="p"
            sx={{ mt: 1, fontSize: 20 }}
         >
            {title}
         </Typography>
         <Divider />
         {children}
      </>
   );
};

const Home = () => {
   const { currentOwner } = useContext(LoginContext);
   const history = useHistory();
   const {
      data: myBoardinghouse,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/by-owner/${currentOwner.id}`);

   const [message, setMessage] = useState("");
   const [showMessage, setShowMessage] = useState(false);
   const [messageSeverity, setMessageSeverity] = useState("warning");

   const [name, setName] = useState("");
   const [owner, setOwner] = useState("");
   const [completeAddress, setCompleteAddress] = useState("");
   const [contact, setContact] = useState(0);
   const [email, setEmail] = useState("");
   const [zoneAddress, setZoneAddress] = useState("");
   const [streetAddress, setStreetAddress] = useState("");
   const [tagline, setTagline] = useState("");
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude] = useState(0);
   const [offers, setOffers] = useState("");
   const [houseProtocols, setHouseProtocols] = useState("");
   const [waterSource, setWaterSource] = useState("");
   const [gendersAllowed, setGendersAllowed] = useState("Male/Female");
   const [priceRange, setPriceRange] = useState("P 400-500");

   const [isAcceptingTransient, setIsAcceptingTransient] = useState("no");

   const [isSavePending, setIsSavePending] = useState(false);

   const handleTransientChange = (e) => {
      setIsAcceptingTransient(e.target.value);
   };

   useEffect(() => {
      if (myBoardinghouse) {
         setName(myBoardinghouse.name);
         setOwner(myBoardinghouse.owner);
         setCompleteAddress(myBoardinghouse.completeAddress);
         setContact(myBoardinghouse.contacts);
         setEmail(myBoardinghouse.email);
         setZoneAddress(myBoardinghouse.zoneAddress);
         setStreetAddress(myBoardinghouse.streetAddress);
         setLongitude(myBoardinghouse.longitude);
         setLatitude(myBoardinghouse.latitude);
         setOffers(myBoardinghouse.offers ?? "Not Available");
         setTagline(myBoardinghouse.tagline ?? "Not Available");
         setHouseProtocols(myBoardinghouse.houseProtocols ?? "Not Available");
         setWaterSource(myBoardinghouse.waterSource ?? "Not Available");
         setGendersAllowed(myBoardinghouse.genderAllowed ?? "Male/Female");
         setPriceRange(myBoardinghouse.priceRange ?? "P 400-500");
         setIsAcceptingTransient(myBoardinghouse.acceptingTransient ?? "no");
      }
   }, [myBoardinghouse]);

   useEffect(() => {
      setCompleteAddress(`${streetAddress} - ${zoneAddress}, UEP`);
   }, [zoneAddress, streetAddress]);

   const handleUpdateBoardinghouse = () => {
      console.log("Boardinghouse updated");
      setIsSavePending(true);
      fetch(`${domain}/api/boarding-houses/by-owner/${currentOwner.id}`)
         .then((res) => res.json())
         .then((boardinghouse) => {
            fetch(`${domain}/api/boarding-houses/update/${boardinghouse.id}`, {
               method: "PUT",
               body: JSON.stringify({
                  name: name,
                  owner: owner,
                  completeAddress: completeAddress,
                  contact: contact,
                  email: email,
                  zoneAddress: zoneAddress,
                  streetAddress: streetAddress,
                  longitude: longitude,
                  latitude: latitude,
                  offers: offers,
                  tagline: tagline,
                  waterSource: waterSource,
                  houseProtocols: houseProtocols,
                  gendersAllowed: gendersAllowed,
                  priceRange: priceRange,
                  acceptingTransient: isAcceptingTransient,
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            })
               .then((res) => res.json())
               .then((data) => {
                  setIsSavePending(false);
                  setTimeout(() => {
                     history.goBack();
                  }, 1500);

                  setMessage(data.message);
                  setMessageSeverity("success");
                  setShowMessage(true);
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   };

   return (
      <Container disableGutters maxWidth="xl">
         <NavbarDrawer title="My Boarding House">
            <AccountMenu />
         </NavbarDrawer>
         <Notification
            message={message}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
            messageSeverity={messageSeverity}
         />
         {error && (
            <Typography variant="body1" textAlign="center" color="initial">
               {error}
            </Typography>
         )}
         {isPending && <LoadingState />}
         {myBoardinghouse && (
            <Container maxWidth="md">
               <Box
                  sx={{
                     gap: 1,
                     pt: 3,
                     display: "flex",
                     justifyContent: "flex-end",
                  }}
               >
                  <Button
                     id="cancel-update-button"
                     variant="contained"
                     color="secondary"
                     size="small"
                     disableElevation
                     onClick={() => history.goBack()}
                  >
                     Cancel
                  </Button>
                  <LoadingButton
                     id="save-update-button"
                     variant="contained"
                     size="small"
                     loading={isSavePending}
                     loadingIndicator="SAVING..."
                     disableElevation
                     onClick={handleUpdateBoardinghouse}
                  >
                     Save
                  </LoadingButton>
               </Box>
               <Card sx={{ my: 5, mt: 2 }}>
                  <CardContent sx={{ paddingBottom: 0 }}>
                     <TextField
                        id="bh-name"
                        label="Boarding House Name"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                     />
                     <TextField
                        id="bh-owner"
                        label="Owner Name"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={owner}
                        disabled
                        onChange={(e) => setOwner(e.target.value)}
                     />
                     <TextField
                        id="bh-contacts"
                        label="Contact Number"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        type="number"
                        fullWidth
                        helperText="Ex. 09166809369"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                     />
                     <TextField
                        id="bh-email"
                        label="Email Address"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        type="email"
                        fullWidth
                        helperText="Ex. totoybibo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />

                     <FormControl sx={{ mt: 1 }}>
                        <FormLabel id="question">
                           Are you accepting transients? (Momentary Staying for
                           days or weeks only.)
                        </FormLabel>
                        <RadioGroup
                           row
                           aria-labelledby="question"
                           name="is-accepting-transient"
                           value={isAcceptingTransient}
                           onChange={handleTransientChange}
                        >
                           <FormControlLabel
                              value="yes"
                              control={<Radio />}
                              label="Yes"
                           />
                           <FormControlLabel
                              value="no"
                              control={<Radio />}
                              label="No"
                           />
                        </RadioGroup>
                     </FormControl>
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 1,
                           py: 1,
                        }}
                     >
                        <FormControl sx={{ width: 200, mt: ".3rem" }}>
                           <InputLabel size="small" id="gender-allowed-label">
                              Gender Allowed
                           </InputLabel>
                           <Select
                              labelId="gender-label"
                              id="gender-allowed-select"
                              value={gendersAllowed}
                              size="small"
                              label="Gender Allowed"
                              onChange={(e) => {
                                 setGendersAllowed(e.target.value);
                              }}
                           >
                              <MenuItem value={"Male/Female"}>
                                 Male & Female
                              </MenuItem>
                              <MenuItem value={"Female"}>Female</MenuItem>
                              <MenuItem value={"Male"}>Male</MenuItem>
                           </Select>
                        </FormControl>
                        <FormControl sx={{ width: 200, mt: ".3rem" }}>
                           <InputLabel size="small" id="price-range-label">
                              Price Range
                           </InputLabel>
                           <Select
                              labelId="price-range-select-label"
                              id="price-range"
                              value={priceRange}
                              size="small"
                              label="Price Range"
                              onChange={(e) => {
                                 setPriceRange(e.target.value);
                              }}
                           >
                              <MenuItem value="P 400-500">400-500</MenuItem>
                              <MenuItem value="P 500-600">500-600</MenuItem>
                              <MenuItem value="P 600-700">600-700</MenuItem>
                              <MenuItem value="P 700-800">700-800</MenuItem>
                              <MenuItem value="P 800-900">800-900</MenuItem>
                              <MenuItem value="P 900-1000">900-1000</MenuItem>
                              <MenuItem value="P 1000+">1000+</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>

                     <Section title="Location">
                        <Typography variant="caption">
                           Your boarding house won't appear to the map if
                           Longitude and Latitude is not setup properly. Please
                           make sure to not leave it blank. You can
                           alternatively set your boarding house coordinates in
                           the{" "}
                           <Link to="/my/map">
                              <Typography
                                 variant="caption"
                                 sx={{ color: "primary" }}
                              >
                                 My Map section.
                              </Typography>
                           </Link>
                        </Typography>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              pt: 1,
                           }}
                        >
                           <TextField
                              id="st-add"
                              label="Street Address"
                              variant="outlined"
                              color="primary"
                              margin="dense"
                              size="small"
                              fullWidth
                              // helperText="e.g. Seaside Drv."
                              value={streetAddress}
                              onChange={(e) => {
                                 setStreetAddress(e.target.value);
                              }}
                           />
                           <FormControl sx={{ width: 200, mt: ".3rem" }}>
                              <InputLabel size="small" id="zone-address">
                                 Zone Address
                              </InputLabel>
                              <Select
                                 labelId="zone-address-label"
                                 id="zone-address-select"
                                 value={zoneAddress}
                                 size="small"
                                 label="Zone Address"
                                 onChange={(e) => {
                                    setZoneAddress(e.target.value);
                                 }}
                              >
                                 <MenuItem value={"Zone 1"}>
                                    Zone 1, UEP
                                 </MenuItem>
                                 <MenuItem value={"Zone 2"}>
                                    Zone 2, UEP
                                 </MenuItem>
                                 <MenuItem value={"Zone 3"}>
                                    Zone 3, UEP
                                 </MenuItem>
                              </Select>
                           </FormControl>
                        </Box>
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              py: 1,
                           }}
                        >
                           <TextField
                              id="longitude"
                              label="Longitude"
                              value={longitude}
                              type="number"
                              size="small"
                              onChange={(e) => setLongitude(e.target.value)}
                           />
                           <TextField
                              id="latitude"
                              label="Latitude"
                              value={latitude}
                              type="number"
                              size="small"
                              onChange={(e) => setLatitude(e.target.value)}
                           />
                        </Box>
                        <TextField
                           id="bh-address"
                           label="Complete Address Preview"
                           variant="outlined"
                           color="primary"
                           margin="dense"
                           size="small"
                           fullWidth
                           value={completeAddress}
                           disabled
                        />
                     </Section>

                     <Section title="Water Source (Separate every entry by using / sign.)">
                        <TextField
                           variant="outlined"
                           placeholder="List down water sources that your boarding house have access to."
                           color="primary"
                           margin="dense"
                           size="small"
                           fullWidth
                           value={waterSource}
                           onChange={(e) => setWaterSource(e.target.value)}
                           onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                 if (
                                    waterSource.charAt(
                                       waterSource.length - 2
                                    ) !== "/"
                                 ) {
                                    setWaterSource(waterSource + "/");
                                 }
                              }
                           }}
                        />
                     </Section>

                     <Section title="Tagline">
                        <TextField
                           id="bh-tagline"
                           placeholder="Quoute for your boarding house. Something that ca attract boarders."
                           variant="outlined"
                           color="primary"
                           margin="dense"
                           size="small"
                           fullWidth
                           multiline
                           rows={3}
                           helperText="A catchy tagline"
                           value={tagline}
                           onChange={(e) => setTagline(e.target.value)}
                        />
                     </Section>
                     <Section title="Offers (Separate every entry by using / sign.)">
                        <TextField
                           id="bh-offers"
                           variant="outlined"
                           placeholder="Everything that you're boarding house offers."
                           color="primary"
                           margin="dense"
                           size="small"
                           fullWidth
                           multiline
                           rows={3}
                           value={offers}
                           onChange={(e) => setOffers(e.target.value)}
                           onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                 if (offers.charAt(offers.length - 2) !== "/") {
                                    setOffers(offers + "/");
                                 }
                              }
                           }}
                        />
                     </Section>
                     <Section title="House Protocols (Separate every entry using / sign.)">
                        <TextField
                           id="bh-protocols"
                           placeholder="List your boarding house rules. (Ex. Do's and Dont's)"
                           variant="outlined"
                           color="primary"
                           margin="dense"
                           size="small"
                           fullWidth
                           multiline
                           rows={3}
                           value={houseProtocols}
                           onChange={(e) => setHouseProtocols(e.target.value)}
                           onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                 if (
                                    houseProtocols.charAt(
                                       houseProtocols.length - 2
                                    ) !== "/"
                                 ) {
                                    setHouseProtocols(houseProtocols + "/");
                                 }
                              }
                           }}
                        />
                     </Section>
                  </CardContent>
               </Card>
            </Container>
         )}
      </Container>
   );
};

export default Home;
