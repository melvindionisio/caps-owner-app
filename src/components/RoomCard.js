import React from "react";
import {
   Card,
   CardHeader,
   IconButton,
   Switch,
   FormGroup,
   FormControlLabel,
   Typography,
   Grid,
   Box,
   Button,
   Divider,
} from "@mui/material";
import { useState } from "react";
import { grey, blue } from "@mui/material/colors";

const RoomCard = ({ room }) => {
   const [isAvailable, setIsAvailable] = useState(true);
   const handleAvailabilityChange = () => {
      setIsAvailable(!isAvailable);
      // This is where every change sends change to the database.
   };
   return (
      <Grid item lg={3} xs={12} md={4} sm={6}>
         <Card sx={{ borderRadius: 2 }}>
            <CardHeader
               action={<IconButton aria-label=""></IconButton>}
               title={
                  <Typography
                     variant="h6"
                     color="initial"
                     align="center"
                     sx={{ textTransform: "uppercase", fontSize: 22 }}
                  >
                     {room.name}
                  </Typography>
               }
               sx={{ marginBottom: 0, paddingBottom: 1 }}
            />
            <Box sx={{ p: 1, pt: 0 }}>
               <Grid container spacing={1}>
                  <Grid item xs={12}>
                     <Box sx={{ px: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                           Total Bed:{" "}
                           <span
                              style={{
                                 fontWeight: "bold",
                                 fontSize: 18,
                                 color: blue[500],
                              }}
                           >
                              {room.totalSlots}
                           </span>
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                           Occupied Bed:{" "}
                           <span
                              style={{
                                 fontWeight: "bold",
                                 fontSize: 18,
                                 color: blue[500],
                              }}
                           >
                              {room.occupiedSlots}
                           </span>
                        </Typography>
                        <Typography
                           variant="subtitle2"
                           color="text.secondary"
                           marginBottom
                        >
                           Available Bed:{" "}
                           <span
                              style={{
                                 fontWeight: "bold",
                                 fontSize: 18,
                                 color: blue[500],
                              }}
                           >
                              {room.totalSlots - room.occupiedSlots}
                           </span>
                        </Typography>
                        <Divider />
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "flex-end",

                           borderRadius: 1,
                           background: grey[100],
                           height: "100%",
                        }}
                     >
                        <FormGroup>
                           <FormControlLabel
                              sx={{ color: "text.secondary" }}
                              label={isAvailable ? "ENABLED" : "DISABLED"}
                              labelPlacement="end"
                              value="bottom"
                              control={
                                 <Switch
                                    size="medium"
                                    color="secondary"
                                    checked={isAvailable}
                                    onChange={handleAvailabilityChange}
                                 />
                              }
                           />
                        </FormGroup>
                     </Box>
                  </Grid>
               </Grid>
            </Box>
            <Button
               disableElevation
               fullWidth
               variant="contained"
               size="medium"
               color="secondary"
               sx={{ mt: 1, borderRadius: 0 }}
            >
               View Room
            </Button>
         </Card>
      </Grid>
   );
};

export default RoomCard;
