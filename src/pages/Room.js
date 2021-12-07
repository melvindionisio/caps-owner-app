import { Container, Button, Slide } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
// import { useParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch";

const Room = () => {
  // const roomId = useParams();
  // const { data, isPending, error} = useFetch(`http://locahost:3500/api/rooms/${roomId}`);

  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        <Navbar title="Room Name">
          <Button
            variant="contained"
            disableElevation
            size="small"
            color="primary"
          >
            Edit
          </Button>
          <Button variant="contained" disableElevation size="small">
            Delete
          </Button>
        </Navbar>
        {/* Room Information here */}
      </Container>
    </Slide>
  );
};

export default Room;
