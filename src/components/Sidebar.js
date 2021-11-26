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
        <Toolbar sx={{ padding: "0 .7rem" }} disableGutters>
          <Avatar src={logo} style={{ height: "2rem", width: "2rem" }}></Avatar>
          <Typography
            variant="body1"
            component="h1"
            sx={{ fontFamily: "Quicksand" }}
          >
            SEARCH 'N STAY
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
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
          onClick={() => history.push("/my")}
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
