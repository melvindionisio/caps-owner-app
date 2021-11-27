import { Container, Button, Hidden } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router";
// import { Hidden } from "@material-ui/core";
import { green } from "@mui/material/colors";
import NavbarDrawer from "../components/NavbarDrawer";

const Rooms = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <Container disableGutters maxWidth="xl">
      <NavbarDrawer title="my rooms">
        <Box>
          <Hidden mdDown>
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
          </Hidden>
          <Button variant="contained" disableElevation color="primary">
            Edit
          </Button>
        </Box>
      </NavbarDrawer>

      <Box textAlign="center">
        <Button onClick={() => history.push(`${location.pathname}/room`)}>
          View a room
        </Button>
      </Box>
    </Container>
    // </Slide>
  );
};

export default Rooms;
