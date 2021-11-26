import { Slide, Container, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import React from "react";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router";
import { Hidden } from "@material-ui/core";
import DesktopNavbar from "../components/DesktopNavbar";
import { green } from "@mui/material/colors";

const Rooms = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        <Hidden lgUp>
          <Navbar title="ROOMS">
            <Button variant="contained" disableElevation color="primary">
              Edit
            </Button>
          </Navbar>
        </Hidden>
        <Hidden mdDown>
          <DesktopNavbar title="ROOMS">
            <Box>
              <Button
                variant="contained"
                disableElevation
                // color="primary"
                sx={{
                  mr: 1,
                  background: green[600],
                  "&:hover": {
                    background: green[700],
                  },
                }}
                onClick={() => history.push("/my/add-room")}
              >
                Add
              </Button>
              <Button variant="contained" disableElevation color="primary">
                Edit
              </Button>
            </Box>
          </DesktopNavbar>
        </Hidden>
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
