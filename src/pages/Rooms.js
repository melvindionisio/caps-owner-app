import { Container, Grid, Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { useHistory } from "react-router";
import { green } from "@mui/material/colors";
import NavbarDrawer from "../components/NavbarDrawer";
import RoomCard from "../components/RoomCard";
import { AddCircle } from "@mui/icons-material";

const Rooms = () => {
  const history = useHistory();

  return (
    <Container disableGutters maxWidth="xl">
      <NavbarDrawer title="my rooms">
        <Box>
          <Button
            variant="contained"
            disableElevation
            size="small"
            sx={{
              mr: 1,
              background: green[600],
              "&:hover": {
                background: green[700],
              },
            }}
            onClick={() => history.push("/my/add-room")}
            startIcon={<AddCircle />}
          >
            Add
          </Button>
        </Box>
      </NavbarDrawer>

      <Container disableGutters maxWidth="lg" sx={{ p: 2, pt: 3 }}>
        <Grid container spacing={2}>
          <Grid item lg={3} xs={12} md={4} sm={6}>
            <RoomCard />
          </Grid>
          <Grid item lg={3} xs={12} md={4} sm={6}>
            <RoomCard />
          </Grid>
          <Grid item lg={3} xs={12} md={4} sm={6}>
            <RoomCard />
          </Grid>
          <Grid item lg={3} xs={12} md={4} sm={6}>
            <RoomCard />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Rooms;
