import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  appbar: {
    background: grey[900],
    padding: ".5rem 0",
  },
  appbarcontent: {
    display: "flex",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "1rem",
  },
  icon: {
    color: "white",
  },
});
const Navbar = ({ title, children }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <AppBar
      position="sticky"
      className={classes.appbar}
      variant="outlined"
      color="primary"
    >
      <Toolbar disableGutters variant="dense" className={classes.toolbar}>
        <Box className={classes.appbarcontent}>
          <IconButton size="medium" onClick={() => history.goBack()}>
            <ArrowBackIcon className={classes.icon} fontSize="medium" />
          </IconButton>
        </Box>
        <Typography variant="body1">{title}</Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
