import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles({
  appbar: {
    background: grey[900],
    padding: ".3rem 0",
  },
  appbarcontent: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color: "white",
  },
});
const DesktopNavbar = ({ title, children }) => {
  const classes = useStyles();
  //   const history = useHistory();
  return (
    <AppBar
      position="sticky"
      className={classes.appbar}
      elevation={1}
      // color="primary"
      sx={{ background: grey[900] }}
    >
      <Toolbar
        disableGutters
        variant="densed"
        sx={{
          padding: "0.5rem .5rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box className={classes.appbarcontent}>
          {/* <IconButton size="medium" onClick={() => history.goBack()}>
            <ArrowBackIcon className={classes.icon} fontSize="medium" />
          </IconButton> */}
          <Typography variant="body1" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNavbar;
