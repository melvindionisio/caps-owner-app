import { Container, Hidden } from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, pink, grey, blueGrey } from "@mui/material/colors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddRoom from "./pages/AddRoom";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const useStyles = makeStyles({
  mainContainer: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    overflowY: "auto",
    postion: "relative",
    background: grey[100],
  },
  page: {
    background: blueGrey[50],
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
  },
  permanentDrawer: {
    width: 250,
    flexShrink: 0,
    boxShadow: "3px 0px 5px rgba(0,0,0,0.2)",
  },
  drawerPaper: {
    width: 250,
  },
});

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[600],
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  spacing: 8,
});

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        className={classes.mainContainer}
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          // bgColor: "background.default",
        }}
        maxWidth="xl"
      >
        <Router>
          <Hidden lgDown>
            <Sidebar />
          </Hidden>

          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/my/boarding-house">
              <Home />
            </Route>
            <Route path="/my/add-room">
              <AddRoom />
            </Route>
            <Route exact path="/my/rooms">
              <Rooms />
            </Route>
            <Route exact path="/my/rooms/room">
              <Room />
            </Route>
            <Route path="/my/dashboard">
              <Dashboard />
            </Route>
            <Route path="/my/profile">
              <Profile />
            </Route>
            <Route path="*">
              <h2>GG</h2>
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
