import React from "react";
import { Container, Button, Slide, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Navbar from "../components/Navbar";
// import { useParams } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
// import { useContext } from "react";
// import LoginContext from '../contexts/LoginContext';

const Room = () => {
  // const {currentOwner } = useContext(LoginContext);
  // const ownerId = currentOwner.id;
  // const { roomId } = useParams();
  // const { data, isPending, error } = useFetch(
  //   `http://locahost:3500/api/${bhId}/rooms/${roomId}`
  // );

  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        {/* {error && ( */}
        <Typography variant="body1" color="initial">
          {/* {error} */}
        </Typography>
        {/* )} */}
        {/* {isPending && ( */}
        <Navbar title="Room Name">
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
          >
            Delete
          </Button>
        </Navbar>
        {/* )} */}
      </Container>
    </Slide>
  );
};

export default Room;
