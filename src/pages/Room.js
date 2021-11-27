import { Container, Button, Slide } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
// import DesktopNavbar from "../components/DesktopNavbar";

const Room = () => {
  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        {/* <Hidden lgUp> */}
        <Navbar title="Room Name">
          <Button variant="contained" disableElevation color="primary">
            Edit
          </Button>
        </Navbar>
        {/* </Hidden> */}
        {/* <Hidden mdDown>
          <DesktopNavbar title="Room Name">
            <Button variant="contained" disableElevation color="primary">
              Edit
            </Button>
          </DesktopNavbar>
        </Hidden> */}
      </Container>
    </Slide>
  );
};

export default Room;
