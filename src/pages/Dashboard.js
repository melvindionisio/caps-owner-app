import React from "react";
import { Container } from "@mui/material";
import NavbarDrawer from "../components/NavbarDrawer";
import { IconButton } from "@material-ui/core";
const Dashboard = () => {
  return (
    // <Slide in={true} direction="right">
    <Container disableGutters maxWidth="xl">
      <NavbarDrawer title="dashboard">
        <IconButton></IconButton>
      </NavbarDrawer>
      <Container maxWidth="xl" sx={{ p: 2 }} disableGutters>
        how many rooms, rooms Available, Rooms not available, Boarding house
        stars and name
      </Container>
    </Container>
    //</Slide>
  );
};

export default Dashboard;
