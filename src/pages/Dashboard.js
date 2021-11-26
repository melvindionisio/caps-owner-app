import React from "react";
import Navbar from "../components/Navbar";
import { Slide, Container } from "@mui/material";
import { IconButton } from "@material-ui/core";
const Dashboard = () => {
  return (
    <Slide in={true} direction="right">
      <Container disableGutters maxWidth="xl">
        <Navbar title="Dashboard">
          <IconButton size="medium"></IconButton>
        </Navbar>
        how many rooms, rooms Available, Rooms not available
      </Container>
    </Slide>
  );
};

export default Dashboard;
