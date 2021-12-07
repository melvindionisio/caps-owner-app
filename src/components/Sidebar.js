import {
  AppBar,
  Drawer,
  List,
  Toolbar,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import KingBedIcon from "@mui/icons-material/KingBed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import React from "react";

import logo from "../sns-logo.png";
import { Avatar } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    background: grey[100],
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const menuItems = [
    {
      key: 0,
      text: "Dashboard",
      path: "/my/dashboard",
      icon: <DashboardIcon />,
    },
    {
      key: 1,
      text: "My Boarding House",
      path: "/my/boarding-house",
      icon: <OtherHousesIcon />,
    },
    {
      key: 2,
      text: "My Rooms",
      path: "/my/rooms",
      icon: <KingBedIcon />,
    },
    {
      key: 3,
      text: "Profile",
      path: "/my/profile",
      icon: <ManageAccountsIcon />,
    },
    {
      key: 4,
      text: "Map",
      path: "/my/map",
      icon: <MyLocationIcon />,
    },
  ];
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      sx={
        location.pathname === "/login"
          ? { display: "none" }
          : { display: "flex" }
      }
    >
      <AppBar position="static" elevation={1} color="default">
        <Toolbar
          sx={{ padding: "0 .7rem", display: "flex", gap: 1 }}
          disableGutters
        >
          <Avatar src={logo} style={{ height: "2rem", width: "2rem" }}></Avatar>
          <Typography
            variant="body1"
            component="h1"
            sx={{
              fontFamily: "Quicksand",
              fontWeight: "bold",
            }}
          >
            SEARCH 'N STAY
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.key}
            button
            divider
            disablePadding
            onClick={() => history.push(item.path)}
            sx={
              location.pathname === item.path
                ? {
                    background: grey[300],
                    color: grey[900],
                  }
                : { background: "transparent" }
            }
          >
            <ListItemButton>
              <ListItemIcon
                sx={
                  location.pathname === item.path
                    ? { color: grey[800] }
                    : { color: grey[500] }
                }
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
