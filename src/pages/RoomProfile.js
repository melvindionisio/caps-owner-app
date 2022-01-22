import React, { useState } from "react";
import { Container, Button, Slide, Typography, TextField } from "@mui/material";
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

   const {
      data: room,
      isPending,
      error,
   } = useFetch(`http://localhost:3500/api/rooms/${roomId}`);

   const handleRoomDelete = (roomId, roomName) => {
      if (roomDeleteConfirm === roomName) {
         setDeleteIsPending(true);
         fetch(`http://localhost:3500/api/rooms/delete/${roomId}`, {
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
                           width: 400,
                           bgcolor: "background.paper",
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
                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
               </>
            )}
         </Container>
      </Slide>
   );
};

export default Room;
