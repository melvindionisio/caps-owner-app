import { makeStyles } from "@mui/styles";
import {
   Container,
   Box,
   Slide,
   Grid,
   TextField,
   Button,
   Card,
   CardContent,
} from "@mui/material";
import CustomInputPicture from "../components/CustomInputPicture";
import Navbar from "../components/Navbar";
import { useState, useContext, useEffect } from "react";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LoginContext } from "../contexts/LoginContext";

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
   const { currentOwner } = useContext(LoginContext);
   const [roomPicture, setRoomPicture] = useState(null);
   const [roomName, setRoomName] = useState("");
   const [roomDescription, setRoomDescription] = useState("");
   const [roomType, setRoomType] = useState("");
   const [genderCategory, setGenderCategory] = useState("");
   const [totalSlots, setTotalSlots] = useState(0);
   const [occupiedSlots, setOccupiedSlots] = useState(0);

   const [message, setMessage] = useState("");
   const [showMessage, setShowMessage] = useState(false);
   const [messageSeverity, setMessageSeverity] = useState("warning");

   const handleRoomSave = async () => {
      if (!roomPicture) {
         console.log("No picture");
         setRoomPicture(null);
         setRoomName("");
         setRoomDescription("");
      } else {
         console.log(roomName, roomDescription, roomPicture);
      }

      fetch(
         `http://localhost:3500/api/boarding-houses/by-owner/${currentOwner.id}`
      )
         .then((res) => res.json())
         .then((data) => {
            fetch(`http://localhost:3500/api/rooms/add/${data.id}`, {
               method: "POST",
               body: JSON.stringify({
                  roomName: roomName,
                  roomDescription: roomDescription,
                  roomType: roomType,
                  genderAllowed: genderCategory,
                  totalSlots: totalSlots,
                  occupiedSlots: occupiedSlots,
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            })
               .then((res) => {
                  return res.json();
               })
               .then((data) => {
                  console.log(data.message, message, messageSeverity);
                  setMessage(data.message);
                  setShowMessage(true);
                  setMessageSeverity("info");

                  setRoomName("");
                  setRoomDescription("");
                  setRoomType("");
                  setGenderCategory("");
                  setTotalSlots(0);
                  setOccupiedSlots(0);
               })
               .catch((err) => {
                  console.log(err);
                  setMessage(err);
                  setShowMessage(true);
                  setMessageSeverity("error");
               });
         });
   };

   useEffect(() => {
      if (showMessage) {
         setTimeout(() => {
            setShowMessage(false);
         }, 350);
      }
   }, [showMessage]);

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl" sx={{ paddingBottom: 5 }}>
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

            <Container disableGutters maxWidth="md" sx={{ paddingBottom: 5 }}>
               <Grid container spacing={2} className={classes.gridContainer}>
                  <Grid item lg={5} sm={6} xs={12}>
                     <CustomInputPicture setRoomPicture={setRoomPicture} />
                  </Grid>

                  <Grid item lg={7} sm={6} xs={12}>
                     <Card>
                        <CardContent>
                           <TextField
                              label="Room Name"
                              fullWidth
                              size="small"
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
                              size="small"
                              rows={6}
                              multiline
                              variant="outlined"
                              color="primary"
                              value={roomDescription}
                              margin="dense"
                              sx={{ background: "#fff" }}
                              onChange={(e) =>
                                 setRoomDescription(e.target.value)
                              }
                           />
                           <Box
                              sx={{
                                 display: "flex",
                                 gap: 1,
                                 marginTop: 1,
                              }}
                           >
                              <FormControl fullWidth size="small">
                                 <InputLabel id="room-type-label">
                                    Room Type
                                 </InputLabel>
                                 <Select
                                    labelId="room-type"
                                    id="room-type"
                                    value={roomType}
                                    label="Room Type"
                                    onChange={(e) =>
                                       setRoomType(e.target.value)
                                    }
                                 >
                                    <MenuItem value={"Studio"}>
                                       Studio Type
                                    </MenuItem>
                                    <MenuItem value={"6-person-room"}>
                                       6 Person-room
                                    </MenuItem>
                                    <MenuItem value={"4-person-room"}>
                                       4 Person-room
                                    </MenuItem>
                                    <MenuItem value={"2-person-room"}>
                                       2 Person-room
                                    </MenuItem>
                                    <MenuItem value={"single"}>Single</MenuItem>
                                 </Select>
                              </FormControl>
                              <FormControl fullWidth size="small">
                                 <InputLabel id="gender-cat-label">
                                    Gender Allowed
                                 </InputLabel>
                                 <Select
                                    labelId="gender-category"
                                    id="gender-cat"
                                    value={genderCategory}
                                    label="Gender Category"
                                    onChange={(e) =>
                                       setGenderCategory(e.target.value)
                                    }
                                 >
                                    <MenuItem value={"Male"}>
                                       Male Only
                                    </MenuItem>
                                    <MenuItem value={"Female"}>
                                       Female Only
                                    </MenuItem>
                                    <MenuItem value={"All"}>All</MenuItem>
                                 </Select>
                              </FormControl>
                           </Box>

                           <Box
                              sx={{
                                 display: "flex",
                                 gap: 1,
                                 marginTop: 2,
                              }}
                           >
                              <TextField
                                 id="num-slots"
                                 label="Number of Slots"
                                 type="number"
                                 size="small"
                                 value={totalSlots}
                                 fullWidth
                                 onChange={(e) => setTotalSlots(e.target.value)}
                              />

                              <TextField
                                 id="occupied-slots"
                                 label="Occupied Slots"
                                 type="number"
                                 size="small"
                                 value={occupiedSlots}
                                 fullWidth
                                 onChange={(e) =>
                                    setOccupiedSlots(e.target.value)
                                 }
                              />
                           </Box>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </Container>
         </Container>
      </Slide>
   );
};

export default AddRoom;
