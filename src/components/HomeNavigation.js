import {
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { AppBar } from "@mui/material";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { Hidden } from "@mui/material";
// import { grey } from "@mui/material/colors";
// import AccountMenu from "./AccountMenu";
import Menu from "./Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import KingBedIcon from "@mui/icons-material/KingBed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useHistory } from "react-router-dom";

const HomeNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const history = useHistory();

  return (
    <React.Fragment>
      <Menu
        handleDrawerToggle={handleDrawerToggle}
        menuOpen={menuOpen}
        anchor="left"
      >
        <ListItem
          button
          divider
          disablePadding
          onClick={() => history.push("/my/dashboard")}
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem
          button
          divider
          disablePadding
          onClick={() => history.push("/my/boarding-house")}
        >
          <ListItemButton>
            <ListItemIcon>
              <OtherHousesIcon />
            </ListItemIcon>
            <ListItemText primary="My Boarding House" />
          </ListItemButton>
        </ListItem>
        <ListItem
          button
          divider
          disablePadding
          onClick={() => history.push("/my/rooms")}
        >
          <ListItemButton>
            <ListItemIcon>
              <KingBedIcon />
            </ListItemIcon>
            <ListItemText primary="My Rooms" />
          </ListItemButton>
        </ListItem>
        <ListItem
          button
          divider
          disablePadding
          onClick={() => history.push("/my/profile")}
        >
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </Menu>
      <AppBar position="sticky" elevation={1} color="primary">
        <Toolbar
          disableGutters
          sx={{
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Hidden mdUp>
            <IconButton size="medium" onClick={handleDrawerToggle}>
              <MenuOutlinedIcon
                fontSize="medium"
                onClick={handleDrawerToggle}
              />
            </IconButton>
          </Hidden>
          <Typography variant="h6" sx={{ ml: 1 }}>
            My Boarding House
          </Typography>
          <Avatar>B</Avatar>

          {/* <AccountMenu /> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HomeNavigation;
