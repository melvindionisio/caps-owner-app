import { makeStyles } from "@mui/styles";
import { Container, Box, Slide, Grid, TextField, Button } from "@mui/material";
import CustomInputPicture from "../components/CustomInputPicture";
import Navbar from "../components/Navbar";
import { useState } from "react";
import React from "react";

const useStyles = makeStyles({
  gridContainer: {
    padding: "1rem",
    paddingTop: "1.5rem",
  },
  scrollContainer: {
    marginBottom: "1rem",
  },
});
const AddRoom = () => {
  const classes = useStyles();
  const [roomPicture, setRoomPicture] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const handleRoomSave = () => {
    if (!roomPicture) {
      console.log("No picture");
      setRoomPicture(null);
      setRoomName("");
      setRoomDescription("");
    } else {
      console.log(roomName, roomDescription, roomPicture);
    }
  };
  return (
    <Slide in={true} direction="left">
      <Container disableGutters maxWidth="xl">
        <Navbar title="ADD ROOM">
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleRoomSave}
            disabled={roomName ? false : true}
            size="small"
          >
            Save
          </Button>
        </Navbar>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item lg={4} sm={6} xs={12}>
            <Box className={classes.scrollContainer}>
              <CustomInputPicture setRoomPicture={setRoomPicture} />
            </Box>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                label="Room Name"
                fullWidth
                variant="outlined"
                color="primary"
                value={roomName}
                autoFocus
                required
                margin="dense"
                sx={{ background: "#fff" }}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <TextField
                label="Room Description"
                fullWidth
                rows={5}
                multiline
                variant="outlined"
                color="primary"
                value={roomDescription}
                margin="dense"
                sx={{ background: "#fff" }}
                onChange={(e) => setRoomDescription(e.target.value)}
              />
            </form>
          </Grid>
        </Grid>
      </Container>
    </Slide>
  );
};

export default AddRoom;
