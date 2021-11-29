import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { grey } from "@mui/material/colors";
import SubCategory from "../components/SubCategory";
import NavbarDrawer from "../components/NavbarDrawer";
import AccountMenu from "../components/AccountMenu";
import React from "react";

import RoomSlider from "../components/RoomSlider";
import { Hidden } from "@material-ui/core";

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

  const history = useHistory();

  return (
    // <Slide in={true} direction="right">
    <Container disableGutters className={classes.container} maxWidth="xl">
      {/* <HomeNavigation /> */}
      <NavbarDrawer title="My Boarding House">
        <AccountMenu />
      </NavbarDrawer>
      <Container maxWidth="lg" className={classes.scrollContainer}>
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
        <Box sx={{ py: 2, px: 1 }}>
          <Hidden smUp>
            <RoomSlider sliderCount={1} />
          </Hidden>
          <Hidden only={["xl", "lg", "md", "xs"]}>
            <RoomSlider sliderCount={2} />
          </Hidden>
          <Hidden only={["xl", "lg", "sm", "xs"]}>
            <RoomSlider sliderCount={3} />
          </Hidden>
          <Hidden mdDown>
            <RoomSlider sliderCount={4} />
          </Hidden>
        </Box>
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
      </Container>
    </Container>
    // </Slide>
  );
};

export default Home;
