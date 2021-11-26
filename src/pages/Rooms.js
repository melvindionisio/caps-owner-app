import { Slide, Container, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import React from "react";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router";
const Rooms = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        <Navbar title="ROOMS">
          <Button variant="contained" disableElevation color="primary">
            Edit
          </Button>
        </Navbar>
        <Box textAlign="center">
          <Button onClick={() => history.push(`${location.pathname}/room`)}>
            View a room
          </Button>
        </Box>
      </Container>
    </Slide>
  );
};

export default Rooms;
