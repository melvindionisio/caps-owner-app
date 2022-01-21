import React from "react";
import { Container, Button, Slide, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";

const Room = () => {
   const { roomId } = useParams();

   const {
      data: room,
      isPending,
      error,
   } = useFetch(`http://localhost:3500/api/rooms/${roomId}`);

   const handleRoomDelete = (roomId) => {
      console.log("deleted");
   };

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl">
            {error && (
               <Typography variant="body1" color="initial">
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState />}
            {room && (
               <Navbar title={room.name}>
                  <Button
                     variant="contained"
                     disableElevation
                     size="small"
                     sx={{
                        background: red[500],
                        "&:hover": {
                           background: red[800],
                        },
                     }}
                     onClick={() => handleRoomDelete(room.id)}
                  >
                     Delete
                  </Button>
               </Navbar>
            )}
         </Container>
      </Slide>
   );
};

export default Room;
