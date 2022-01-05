import { Container, Grid, Button, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { Box } from "@mui/system";
import { useHistory } from "react-router";
import { green } from "@mui/material/colors";
import NavbarDrawer from "../components/NavbarDrawer";
import RoomCard from "../components/RoomCard";
import { AddCircle } from "@mui/icons-material";
import { LoginContext } from "../contexts/LoginContext";
import LoadingState from "../components/LoadingState";

const Rooms = () => {
    const history = useHistory();
    const { currentOwner } = useContext(LoginContext);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(
            `http://localhost:3500/api/boarding-houses/by-owner/${currentOwner.id}`,
            { signal: abortCont.signal }
        )
            .then((res) => {
                return res.json();
            })
            .then((boardinghouse) => {
                fetch(`http://localhost:3500/api/rooms/all/${boardinghouse.id}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        setRooms(data);
                        setIsPending(false);
                        setError(null);
                    })
                    .catch((err) => {
                        if (err.name === "AbortError") {
                            console.log("fetch aborted");
                        } else {
                            setIsPending(false);
                            setError(err.message);
                            setRooms(null);
                        }
                    });
            })
            .catch((err) => console.log(err));
        return () => {
            abortCont.abort();
        };
    }, [currentOwner]);

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
                    {error && (
                        <Typography
                            align="center"
                            variant="body1"
                            color="text.secondary"
                        >
                            {error}
                        </Typography>
                    )}
                    {isPending && <LoadingState loadWhat="rooms" />}
                    {rooms &&
                        rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                </Grid>
            </Container>
        </Container>
    );
};

export default Rooms;
