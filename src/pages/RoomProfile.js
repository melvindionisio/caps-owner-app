import React, { useState, useEffect } from "react";
import {
   Container,
   Card,
   CardMedia,
   Button,
   Slide,
   Typography,
   TextField,
   Grid,
   FormControl,
   InputLabel,
   Select,
   CardContent,
   MenuItem,
   CardActions,
   Fade,
   Backdrop,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomInputPicture from "../components/CustomInputPicture";
import { domain } from "../fetch-url/fetchUrl";
import RoomToggler from "../components/RoomToggler";

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Room = () => {
   const { roomId } = useParams();
   const history = useHistory();

   const [message, setMessage] = useState("");
   const [showMessage, setShowMessage] = useState(false);
   const [messageSeverity, setMessageSeverity] = useState("warning");

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [roomDeleteConfirm, setRoomDeleteConfirm] = useState("");
   const [deleteIsPending, setDeleteIsPending] = useState(false);

   const [isEditable, setIsEditable] = useState(!false);
   const [isPictureEditable, setIsPictureEditable] = useState(false);

   const [isRoomSavePending, setIsRoomSavePending] = useState(false);
   const [savePictureIsPending, setSavePictureIsPending] = useState(false);

   const [roomDescription, setRoomDescription] = useState("");
   const [totalSlots, setTotalSlots] = useState(0);
   const [occupiedSlots, setOccupiedSlots] = useState(0);

   const [roomName, setRoomName] = useState("");
   const [roomType, setRoomType] = useState("");
   const [genderAllowed, setGenderAllowed] = useState("All");
   const [roomPicture, setRoomPicture] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
   const [imageName, setImageName] = useState();

   const {
      data: room,
      isPending,
      error,
   } = useFetch(`${domain}/api/rooms/${roomId}`);

   const handleSaveEdits = (e) => {
      e.preventDefault();
      setIsRoomSavePending(true);
      fetch(`${domain}/api/rooms/update/${roomId}`, {
         method: "PUT",
         body: JSON.stringify({
            roomName: roomName,
            roomDescription: roomDescription,
            roomType: roomType,
            roomStatus: "Available",
            genderAllowed: genderAllowed,
            totalSlots: totalSlots,
            occupiedSlots: occupiedSlots,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data.message);
            setIsEditable(!isEditable);
            setIsRoomSavePending(false);

            setMessage(data.message);
            setMessageSeverity("success");
            setShowMessage(true);
            setDeleteIsPending(false);
            setIsModalOpen(false);
         })
         .catch((err) => console.log(err));
   };

   const handleCancelEdits = () => {
      setIsEditable(!isEditable);
      setImagePreview(null);
      setRoomPicture(null);
      setImageName("");
   };

   const handleSavePicture = () => {
      // WHAT WILL hAPPEN?
      //upload new picture and get the new link
      //delete the old picture from file system
      //update new link in the room picture datbase

      setSavePictureIsPending(true);
      const formData = new FormData();
      formData.append("room-image", roomPicture);

      fetch(`${domain}/api/rooms/delete-picture/${roomId}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data.message);

            fetch(`${domain}/api/rooms/upload`, {
               method: "POST",
               body: formData,
            })
               .then((res) => {
                  return res.json();
               })
               .then((newImage) => {
                  console.log(newImage);
                  //setRoomPicture(newImage.imagepath);

                  fetch(`${domain}/api/rooms/update-room-picture/${roomId}`, {
                     method: "PUT",
                     body: JSON.stringify({
                        newImageLink: newImage.imagepath,
                     }),
                     headers: {
                        "Content-Type": "application/json",
                     },
                  })
                     .then((res) => {
                        return res.json();
                     })
                     .then((data) => {
                        setIsPictureEditable(false);
                        setSavePictureIsPending(false);
                        setImagePreview(null);
                        setRoomName("");

                        setMessage(data.message);
                        setMessageSeverity("success");
                        setShowMessage(true);
                        setDeleteIsPending(false);
                        setIsModalOpen(false);

                        setTimeout(() => {
                           window.location.reload(false);
                        }, 1000);
                     })
                     .catch((err) => console.log(err));
               })
               .catch((err) => console.log(err));
         })

         .catch((err) => console.log(err));
   };
   const handleCancelUpdatePicture = () => {
      setIsPictureEditable(false);
      setRoomPicture(null);
      setImagePreview(null);
      setImageName("");
   };

   const handleRoomDelete = (roomId, roomName) => {
      if (roomDeleteConfirm === roomName) {
         setDeleteIsPending(true);
         fetch(`${domain}/api/rooms/delete/${roomId}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               setTimeout(() => {
                  history.goBack();
               }, 1500);
               setMessage(data.message);
               setMessageSeverity("info");
               setShowMessage(true);
               setDeleteIsPending(false);
               setIsModalOpen(false);
            })
            .catch((err) => console.log(err));
      } else {
         setMessage("Room name is incorrect!");
         setMessageSeverity("warning");
         setShowMessage(true);
         setIsModalOpen(true);
      }
   };

   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }
      setShowMessage(false);
   };
   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   useEffect(() => {
      if (room) {
         setRoomName(room.name);
         setRoomDescription(room.description);
         setTotalSlots(room.totalSlots);
         setOccupiedSlots(room.occupiedSlots);
         setRoomType(room.type);
         setGenderAllowed(room.genderAllowed);
         setRoomPicture(room.picture);
      }
   }, [room]);

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl">
            {error && (
               <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 5, fontFamily: "Quicksand" }}
               >
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState />}
            {room && (
               <>
                  <Modal
                     closeAfterTransition
                     BackdropComponent={Backdrop}
                     BackdropProps={{
                        timeout: 500,
                     }}
                     open={isModalOpen}
                     onClose={handleModalClose}
                  >
                     <Fade in={isModalOpen}>
                        <Container
                           maxWidth="xl"
                           disableGutters
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              mt: -7,
                              px: 2,
                           }}
                        >
                           <Box
                              sx={{
                                 zIndex: 100,
                                 width: 400,
                                 bgcolor: "background.paper",
                                 borderRadius: ".5rem",
                                 boxShadow: 10,
                                 p: 2,
                                 py: 2,
                                 height: "max-content",
                                 flexDirection: "column",
                              }}
                           >
                              <Typography
                                 variant="h6"
                                 align="center"
                                 sx={{
                                    textTransform: "uppercase",
                                    fontFamily: "Quicksand",
                                    mb: 1,
                                 }}
                                 component="h2"
                              >
                                 Confirm Deletion
                              </Typography>
                              <TextField
                                 size="small"
                                 color="secondary"
                                 value={roomDeleteConfirm}
                                 onChange={(e) =>
                                    setRoomDeleteConfirm(e.target.value)
                                 }
                                 autoFocus
                                 label="Enter the room name"
                                 fullWidth
                                 margin="normal"
                              />
                              <LoadingButton
                                 variant="contained"
                                 color="secondary"
                                 disableElevation
                                 size="small"
                                 fullWidth
                                 loading={deleteIsPending}
                                 onClick={() => {
                                    handleRoomDelete(room.id, room.name);
                                 }}
                              >
                                 Confirm
                              </LoadingButton>
                           </Box>
                        </Container>
                     </Fade>
                  </Modal>
                  <Snackbar
                     open={showMessage}
                     autoHideDuration={1500}
                     onClose={handleClose}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                     }}
                  >
                     <Alert
                        onClose={handleClose}
                        severity={messageSeverity}
                        sx={{ width: "100%" }}
                     >
                        {message}
                     </Alert>
                  </Snackbar>

                  <Navbar title={room.name} subtitle={`Room `}>
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
                        onClick={() => setIsModalOpen(true)}
                     >
                        Delete
                     </Button>
                  </Navbar>

                  <Container
                     disableGutters
                     maxWidth="md"
                     sx={{ padding: 2, paddingTop: 3, paddingBottom: 5 }}
                  >
                     <Grid container spacing={2}>
                        {isPictureEditable ? (
                           <Grid item lg={5} sm={6} xs={12}>
                              <Card
                                 sx={{
                                    padding: 1,
                                 }}
                              >
                                 <Box
                                    sx={{
                                       display: "flex",
                                       justifyContent: "flex-end",
                                       padding: 0,
                                       marginBottom: 2,
                                       gap: 1,
                                    }}
                                 >
                                    <Button
                                       variant="contained"
                                       onClick={handleCancelUpdatePicture}
                                       size="small"
                                       disableElevation
                                       color="secondary"
                                    >
                                       cancel
                                    </Button>
                                    <LoadingButton
                                       variant="contained"
                                       onClick={handleSavePicture}
                                       size="small"
                                       disableElevation
                                       loading={savePictureIsPending}
                                    >
                                       Save
                                    </LoadingButton>
                                 </Box>
                                 <CustomInputPicture
                                    imagePreview={imagePreview}
                                    setImagePreview={setImagePreview}
                                    imageName={imageName}
                                    setImageName={setImageName}
                                    setRoomPicture={setRoomPicture}
                                 />
                              </Card>
                           </Grid>
                        ) : (
                           <Grid item lg={5} sm={6} xs={12}>
                              <Card sx={{ padding: 1 }}>
                                 <CardActions
                                    sx={{
                                       display: "flex",
                                       justifyContent: "flex-end",
                                       padding: 0,
                                       marginBottom: 2,
                                    }}
                                 >
                                    <Button
                                       variant="contained"
                                       onClick={() =>
                                          setIsPictureEditable(true)
                                       }
                                       size="small"
                                       disableElevation
                                    >
                                       Edit
                                    </Button>
                                 </CardActions>
                                 <Card>
                                    <CardMedia
                                       height="250"
                                       component="img"
                                       alt="room-image"
                                       image={room.picture}
                                    />
                                 </Card>
                              </Card>
                           </Grid>
                        )}

                        <Grid item lg={7} sm={6} xs={12}>
                           <>
                              <Card>
                                 <Box
                                    sx={{
                                       display: "flex",
                                       justifyContent: "flex-end",
                                       gap: 1,
                                       padding: 1,
                                    }}
                                 >
                                    {isEditable ? (
                                       <Button
                                          variant="contained"
                                          size="small"
                                          onClick={() =>
                                             setIsEditable(!isEditable)
                                          }
                                          disableElevation
                                       >
                                          edit
                                       </Button>
                                    ) : (
                                       <>
                                          <Button
                                             variant="contained"
                                             size="small"
                                             color="secondary"
                                             onClick={handleCancelEdits}
                                             disableElevation
                                          >
                                             cancel
                                          </Button>
                                          <LoadingButton
                                             variant="contained"
                                             size="small"
                                             color="primary"
                                             onClick={handleSaveEdits}
                                             loading={isRoomSavePending}
                                          >
                                             Save
                                          </LoadingButton>
                                       </>
                                    )}
                                 </Box>

                                 <Box
                                    sx={{
                                       display: "flex",
                                       justifyContent: "space-between",
                                       alignItems: "center",
                                       borderRadius: 1,
                                       padding: ".5rem 1rem",
                                    }}
                                 >
                                    <Typography variant="body1">
                                       Room Status
                                    </Typography>
                                    <RoomToggler room={room} />
                                 </Box>
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
                                       onChange={(e) =>
                                          setRoomName(e.target.value)
                                       }
                                       disabled={isEditable}
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
                                       disabled={isEditable}
                                    />
                                    <Box
                                       sx={{
                                          display: "flex",
                                          gap: 1,
                                          my: 2,
                                       }}
                                    >
                                       <TextField
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          label="Total Slots"
                                          type="number"
                                          value={totalSlots}
                                          disabled={isEditable}
                                          onChange={(e) =>
                                             setTotalSlots(e.target.value)
                                          }
                                       />
                                       <TextField
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          type="number"
                                          label="Occupied Slots"
                                          value={occupiedSlots}
                                          disabled={isEditable}
                                          onChange={(e) =>
                                             setOccupiedSlots(e.target.value)
                                          }
                                       />
                                       <TextField
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          label="Available Slots"
                                          value={totalSlots - occupiedSlots}
                                          disabled
                                          onChange={(e) =>
                                             setTotalSlots(e.target.value)
                                          }
                                       />
                                    </Box>
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
                                             disabled={isEditable}
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
                                             <MenuItem value={"single"}>
                                                Single
                                             </MenuItem>
                                          </Select>
                                       </FormControl>
                                       <FormControl fullWidth size="small">
                                          <InputLabel id="gender-cat-label">
                                             Gender Allowed
                                          </InputLabel>
                                          <Select
                                             labelId="gender-category"
                                             id="gender-cat"
                                             value={genderAllowed}
                                             label="Gender Category"
                                             onChange={(e) =>
                                                setGenderAllowed(e.target.value)
                                             }
                                             disabled={isEditable}
                                          >
                                             <MenuItem value={"Male"}>
                                                Male Only
                                             </MenuItem>
                                             <MenuItem value={"Female"}>
                                                Female Only
                                             </MenuItem>
                                             <MenuItem value={"All"}>
                                                All
                                             </MenuItem>
                                          </Select>
                                       </FormControl>
                                    </Box>
                                 </CardContent>
                              </Card>
                           </>
                        </Grid>
                     </Grid>
                  </Container>
               </>
            )}
         </Container>
      </Slide>
   );
};

export default Room;
