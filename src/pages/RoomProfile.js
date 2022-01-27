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
import { domain } from "../fetch-url/fetchUrl";

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
   const [roomDescription, setRoomDescription] = useState("");
   const [totalSlots, setTotalSlots] = useState(0);
   const [occupiedSlots, setOccupiedSlots] = useState(0);

   const {
      data: room,
      isPending,
      error,
   } = useFetch(`${domain}/api/rooms/${roomId}`);

   const handleSaveEdits = async (e) => {
      e.preventDefault();
      fetch(`${domain}/api/rooms/update/${roomId}`)
         .then((res) => res.json())
         .then((data) => {
            console.log(data.message);
         });

      //setSaveIsPending(true);

      //const formData = new FormData();
      //formData.append("room-image", roomPicture);

      //fetch(`${domain}/api/rooms/upload`, {
      //method: "PUT",
      //body: formData,
      //})
      //.then((res) => {
      //return res.json();
      //})
      //.then((image) => {
      //console.log(image);
      //setImageName("Select Image");
      //fetch(`${domain}/api/boarding-houses/by-owner/${currentOwner.id}`)
      //.then((res) => res.json())
      //.then((data) => {
      //fetch(`${domain}/api/rooms/add/${data.id}`, {
      //method: "POST",
      //body: JSON.stringify({
      //roomName: roomName,
      //roomDescription: roomDescription,
      //roomType: roomType,
      //roomPicture: image.imagepath,
      //genderAllowed: genderCategory,
      //totalSlots: totalSlots,
      //occupiedSlots: occupiedSlots,
      //}),
      //headers: {
      //"Content-Type": "application/json",
      //},
      //})
      //.then((res) => {
      //return res.json();
      //})
      //.then((data) => {
      //setMessage(data.message);
      //setShowMessage(true);
      //setMessageSeverity("success");

      //setRoomName("");
      //setRoomDescription("");
      //setRoomPicture(null);
      //setRoomType("");
      //setGenderCategory("");
      //setTotalSlots(0);
      //setOccupiedSlots(0);
      //setRoomPicture(null);

      //setImageName("");
      //setImagePreview(null);
      //setSaveIsPending(false);
      //})
      //.catch((err) => {
      //console.log(err);
      //setMessage(err);
      //setShowMessage(true);
      //setMessageSeverity("error");
      //});
      //});
      //})
      //.catch((err) => {
      //console.log(err);
      //setMessage(err);
      //setShowMessage(true);
      //setMessageSeverity("error");
      //});
   };

   const handleCancelEdits = () => {
      setIsEditable(!isEditable);
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
         setRoomDescription(room.description);
         setTotalSlots(room.totalSlots);
         setOccupiedSlots(room.occupiedSlots);
      }
   }, [room]);

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl">
            {error && (
               <Typography variant="body1" color="initial">
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState />}
            {room && (
               <>
                  <Modal open={isModalOpen} onClose={handleModalClose}>
                     <Box
                        sx={{
                           position: "absolute",
                           top: "50%",
                           left: "50%",
                           transform: "translate(-50%, -50%)",
                           bgcolor: "background.paper",
                           width: 300,
                           boxShadow: 24,
                           borderRadius: 2,
                           p: 4,
                           display: "flex",
                           flexDirection: "column",
                           gap: 1,
                        }}
                     >
                        <Typography variant="h6" component="h2">
                           Confirm
                        </Typography>
                        <TextField
                           size="small"
                           value={roomDeleteConfirm}
                           onChange={(e) =>
                              setRoomDeleteConfirm(e.target.value)
                           }
                           label="Enter the room name"
                        />
                        <LoadingButton
                           variant="contained"
                           disableElevation
                           size="small"
                           loading={deleteIsPending}
                           onClick={() => {
                              handleRoomDelete(room.id, room.name);
                           }}
                        >
                           Confirm
                        </LoadingButton>
                     </Box>
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
                  <Navbar title={room.name}>
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
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "flex-end",
                           marginBottom: 2,
                           gap: 1,
                        }}
                     >
                        {isEditable ? (
                           <Button
                              variant="contained"
                              size="small"
                              onClick={() => setIsEditable(!isEditable)}
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
                              >
                                 cancel
                              </Button>
                              <Button
                                 variant="contained"
                                 size="small"
                                 color="primary"
                                 onClick={handleSaveEdits}
                              >
                                 Save
                              </Button>
                           </>
                        )}
                     </Box>

                     <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                           <Card>
                              <CardMedia
                                 height="250"
                                 component="img"
                                 alt="room-image"
                                 image={room.picture}
                              />
                           </Card>
                        </Grid>

                        <Grid item xs={12} md={7}>
                           <Box
                              sx={{
                                 display: "flex",
                                 flexDirection: "column",
                                 gap: 2,
                              }}
                           >
                              <TextField
                                 variant="outlined"
                                 size="small"
                                 fullWidth
                                 multiline
                                 rows="5"
                                 label="Room Description"
                                 value={roomDescription}
                                 disabled={isEditable}
                                 onChange={(e) =>
                                    setRoomDescription(e.target.value)
                                 }
                              />
                              <Box sx={{ display: "flex", gap: 1 }}>
                                 <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    label="Total Slots"
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
                           </Box>
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
