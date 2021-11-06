import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, pink, grey } from "@mui/material/colors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddRoom from "./pages/AddRoom";
import Rooms from "./pages/Rooms";

const useStyles = makeStyles({
  mainContainer: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    overflowY: "scroll",
    postion: "relative",
    background: grey[100],
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
      <Container disableGutters className={classes.mainContainer} maxWidth="xl">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/my">
              <Home />
            </Route>
            <Route path="/my/add-room">
              <AddRoom />
            </Route>
            <Route path="/my/rooms">
              <Rooms />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
