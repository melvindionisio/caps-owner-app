import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0rem 1.5rem",
  },
  closeButton: {
    padding: "1rem",
    alignSelf: "flex-end",
  },
  avatar: {
    height: 80,
    width: 80,
    margin: "auto",
  },
  fullWidth: {
    width: "85%",
    display: "block",
    alignSelf: "center",
  },

  closeContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid lightgrey",
    marginBottom: "1rem",
  },
  sidebarlist: {
    width: "85%",
  }
}));

export default function SideBar({children, handleDrawerToggle, sidebarOpen, anchor }) {
  const classes = useStyles();

  const SideContent = (anchor) => (
    <Box
      pb={2}
      className={clsx(classes.list, classes.container, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Box
        className={classes.closeContainer}
        onClick={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <IconButton size="medium" className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        <Divider />
      </Box>
      <Box className={classes.sidebarlist}>
        {children}
      </Box>
    </Box>
  );

  return (
      <SwipeableDrawer
        anchor={anchor}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        hysteresis={0.1}
      >
        {SideContent(anchor)}
        {/*{children}*/}
      </SwipeableDrawer>
  );
}
