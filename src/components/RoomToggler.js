import React, { useEffect, useState } from "react";
import { Box, FormGroup, Switch, FormControlLabel } from "@mui/material";
import { domain } from "../fetch-url/fetchUrl";

function RoomToggler({ room }) {
   const [isAvailable, setIsAvailable] = useState(false);
   const [roomStatus, setRoomStatus] = useState("Available");
   const [isSwitchPending, setIsSwitchPending] = useState(false);

   const handleAvailabilityChange = () => {
      setIsAvailable(!isAvailable);
      if (roomStatus === "Available") {
         setRoomStatus("Unavailable");
      } else {
         setRoomStatus("Available");
      }
   };

   useEffect(() => {
      setIsSwitchPending(true);
      if (roomStatus === "Available") {
         fetch(`${domain}/api/rooms/enable/${room.id}`, {
            method: "PUT",
         })
            .then((res) => res.json())
            .then((data) => {
               setIsSwitchPending(false);
            })
            .catch((err) => console.log(err));
      } else {
         fetch(`${domain}/api/rooms/disable/${room.id}`, {
            method: "PUT",
         })
            .then((res) => res.json())
            .then((data) => {
               setIsSwitchPending(false);
            })
            .catch((err) => console.log(err));
      }
   }, [roomStatus, room]);

   useEffect(() => {
      if (room.status === "Available") {
         setIsAvailable(true);
         setRoomStatus("Available");
      } else {
         setIsAvailable(false);
         setRoomStatus("Unavailable");
      }
   }, [room]);

   return (
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
                  disabled={isSwitchPending}
               />
            }
         />
      </FormGroup>
   );
}

export default RoomToggler;
