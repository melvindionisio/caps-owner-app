import { Container, Slide, Button } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";

const Room = () => {
  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        <Navbar title="Room Name">
          <Button variant="contained" disableElevation color="primary">
            Edit
          </Button>
        </Navbar>
      </Container>
    </Slide>
  );
};

export default Room;
