import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Slide,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import { useState } from "react";
import SideBar from "../components/SideBar";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import SubCategory from "../components/SubCategory";

const useStyles = makeStyles({
  scrollContainer: {
    padding: ".5rem",
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100vh",
  },
  cardHeader: {
    paddingBottom: "0px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  appbar: {
    padding: "0 0 0rem 0rem",
    background: "white",
  },
  header: {
    color: grey[800],
  },
  informationContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  cardheader: {
    marginBottom: 0,
  },
  cardcontent: {
    paddingTop: 0,
  },
  roomButtonsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: ".5rem",
  },
});

const Home = () => {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const history = useHistory();

  return (
    <Slide in={true} direction="right">
      <Container disableGutters className={classes.container} maxWidth="xl">
        <SideBar
          handleDrawerToggle={handleDrawerToggle}
          sidebarOpen={sidebarOpen}
          anchor="left"
        >
          {/*List of sidebar options*/}
        </SideBar>
        <AppBar
          position="sticky"
          elevation={0}
          variant="outlined"
          className={classes.appbar}
        >
          <Toolbar variant="dense" disableGutters className={classes.toolbar}>
            <IconButton size="medium" onClick={handleDrawerToggle}>
              <MenuOutlinedIcon fontSize="medium" />
            </IconButton>
            <Typography variant="h6" component="h2" className={classes.header}>
              My Boarding House
            </Typography>

            <IconButton size="medium">
              <Avatar className={classes.avatar}>B</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box className={classes.scrollContainer}>
          <Card variant="outlined">
            <CardHeader
              title={
                <Typography variant="h6" component="span">
                  Boarding house Name
                </Typography>
              }
              action={
                <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton>
              }
              subheader={
                <Typography variant="body2" component="p">
                  Boarding house desciption.
                </Typography>
              }
            />
          </Card>

          <Grid container spacing={1} className={classes.informationContainer}>
            <Grid item xs={12}>
              <SubCategory title="Boarding House Information" />
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1">Details</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1">Details</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1">Details</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <SubCategory title="My Rooms" />
          <Typography variant="body2">Sliding Carousel Here</Typography>

          <Box className={classes.roomButtonsContainer}>
            <Button
              onClick={() => history.push("/my/add-room")}
              variant="outlined"
              color="primary"
              className={classes.roomButtons}
              size="small"
            >
              Add Room
            </Button>
            <Button
              onClick={() => history.push("/my/rooms")}
              variant="outlined"
              color="primary"
              className={classes.roomButtons}
              size="small"
            >
              View All Rooms
            </Button>
          </Box>
        </Box>
      </Container>
    </Slide>
  );
};

export default Home;
