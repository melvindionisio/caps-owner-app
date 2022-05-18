import React from "react";
import { useContext } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { Container, Typography } from "@mui/material";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddRoom from "./pages/AddRoom";
import Rooms from "./pages/Rooms";
import RoomProfile from "./pages/RoomProfile";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import BoardinghouseEdit from "./pages/BoardinghouseEdit";

const Routes = () => {
   const { isOwnerLoggedIn } = useContext(LoginContext);
   return (
      <Container disableGutters maxWidth="xl" sx={{ overflowY: "auto" }}>
         <Switch>
            <Route exact path="/">
               <Redirect to="/login" />
            </Route>
            <Route path="/login">
               {isOwnerLoggedIn ? <Redirect to="/my/dashboard" /> : <Login />}
            </Route>
            <Route exact path="/my/boarding-house">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <Home />}
            </Route>

            <Route exact path="/my/boarding-house/edit">
               {!isOwnerLoggedIn ? (
                  <Redirect to="/login" />
               ) : (
                  <BoardinghouseEdit />
               )}
            </Route>
            <Route path="/my/add-room">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <AddRoom />}
            </Route>
            <Route exact path="/my/rooms">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <Rooms />}
            </Route>
            <Route exact path="/my/rooms/:roomId">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <RoomProfile />}
            </Route>
            <Route path="/my/dashboard">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <Dashboard />}
            </Route>
            <Route path="/my/profile">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <Profile />}
            </Route>
            <Route path="/my/Map">
               {!isOwnerLoggedIn ? <Redirect to="/login" /> : <Map />}
            </Route>
            <Route path="*">
               <Typography
                  variant="h6"
                  sx={{ fontFamily: "Quicksand" }}
                  align="center"
               >
                  404 Not Found
               </Typography>
            </Route>
         </Switch>
      </Container>
   );
};

export default Routes;
