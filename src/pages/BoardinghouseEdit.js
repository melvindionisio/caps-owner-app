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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import NavbarDrawer from "../components/NavbarDrawer";
import AccountMenu from "../components/AccountMenu";
import LoadingState from "../components/LoadingState";

import useFetch from "../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useHistory } from "react-router-dom";
import { domain } from "../fetch-url/fetchUrl";

const Home = () => {
   const { currentOwner } = useContext(LoginContext);
   const history = useHistory();
   const {
      data: myBoardinghouse,
      isPending,
      error,
   } = useFetch(
      `http://localhost:3500/api/boarding-houses/by-owner/${currentOwner.id}`
   );
   const [name, setName] = useState("");
   const [owner, setOwner] = useState("");
   const [completeAddress, setCompleteAddress] = useState("");
   const [contact, setContact] = useState(0);
   const [zoneAddress, setZoneAddress] = useState("");
   const [streetAddress, setStreetAddress] = useState("");
   const [tagline, setTagline] = useState("");
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude] = useState(0);
   const [offers, setOffers] = useState("");
   const [houseProtocols, setHouseProtocols] = useState("");
   const [waterSource, setWaterSource] = useState("");
   const [gendersAllowed, setGendersAllowed] = useState("All");
   const [priceRange, setPriceRange] = useState("P 400-500");

   const [isSavePending, setIsSavePending] = useState(false);

   useEffect(() => {
      if (myBoardinghouse) {
         console.log(myBoardinghouse);
         setName(myBoardinghouse.name);
         setOwner(myBoardinghouse.owner);
         setCompleteAddress(myBoardinghouse.completeAddress);
         setContact(myBoardinghouse.contacts);
         setZoneAddress(myBoardinghouse.zoneAddress);
         setStreetAddress(myBoardinghouse.streetAddress);
         setLongitude(myBoardinghouse.longitude);
         setLatitude(myBoardinghouse.latitude);
         setOffers(myBoardinghouse.offers ?? "Not Available");
         setTagline(myBoardinghouse.tagline ?? "Not Available");
         setHouseProtocols(myBoardinghouse.houseProtocols ?? "Not Available");
         setWaterSource(myBoardinghouse.waterSource ?? "Not Available");
         setGendersAllowed(myBoardinghouse.genderAllowed ?? "All");
         setPriceRange(myBoardinghouse.priceRange ?? "P 400-500");
      }
   }, [myBoardinghouse]);

   const handleUpdateBoardinghouse = () => {
      console.log("Boardinghouse updated");
      setIsSavePending(true);
      fetch(`${domain}/api/boarding-houses/by-owner/${currentOwner.id}`)
         .then((res) => res.json())
         .then((boardinghouse) => {
            console.log(boardinghouse);
            fetch(`${domain}/api/boarding-houses/update/${boardinghouse.id}`, {
               method: "PUT",
               body: JSON.stringify({
                  name: name,
                  owner: owner,
                  completeAddress: completeAddress,
                  contact: contact,
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
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            })
               .then((res) => res.json())
               .then((data) => {
                  console.log(data.message);
                  setIsSavePending(false);
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
                        onChange={(e) => setOwner(e.target.value)}
                     />
                     <TextField
                        id="bh-contacts"
                        label="Contact Number"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        helperText="Ex. 09166809369"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                     />
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
                              <MenuItem value={"All"}>All</MenuItem>
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
                              <MenuItem value="P 600-700">700-800</MenuItem>
                              <MenuItem value="P 600-700">900-1000</MenuItem>
                              <MenuItem value="P 600-700">1000+</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>
                     <Typography variant="body1">Location</Typography>
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
                              setCompleteAddress(
                                 `${e.target.value} - ${zoneAddress}, UEP`
                              );
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
                                 setCompleteAddress(
                                    `${streetAddress} - ${zoneAddress}, UEP`
                                 );
                              }}
                           >
                              <MenuItem value={"Zone 1"}>Zone 1, UEP</MenuItem>
                              <MenuItem value={"Zone 2"}>Zone 2, UEP</MenuItem>
                              <MenuItem value={"Zone 3"}>Zone 3, UEP</MenuItem>
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
                           size="small"
                           onChange={(e) => setLongitude(e.target.value)}
                        />
                        <TextField
                           id="latitude"
                           label="Latitude"
                           value={latitude}
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

                     <TextField
                        label="Water Source"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={waterSource}
                        onChange={(e) => setWaterSource(e.target.value)}
                     />

                     <TextField
                        id="bh-tagline"
                        label="Tagline"
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
                     <TextField
                        id="bh-offers"
                        label="Offers"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        helperText="What your boarding house offers"
                        value={offers}
                        onChange={(e) => setOffers(e.target.value)}
                     />
                     <TextField
                        id="bh-protocols"
                        label="House Protocols"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        helperText="Your house rules."
                        value={houseProtocols}
                        onChange={(e) => setHouseProtocols(e.target.value)}
                     />
                  </CardContent>
               </Card>
            </Container>
         )}
      </Container>
   );
};

export default Home;
