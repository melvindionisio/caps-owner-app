import React from "react";
import { Container, Box, Typography, Slide } from "@mui/material";
import NavbarDrawer from "../components/NavbarDrawer";
import AccountMenu from "../components/AccountMenu";

import { CardHeader, Card, Grid, Paper, CardContent } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import useFetch from "../hooks/useFetch";
import LoadingState from "../components/LoadingState";

Chart.register(ArcElement);

const Dashboard = () => {
  const { currentOwner } = useContext(LoginContext);
  const {
    data: boardinghouse,
    isPending: isBoardinghousePending,
    error: boardinghouseError,
  } = useFetch(
    `http://localhost:3500/api/boarding-houses/by-owner/${currentOwner.id}`
  );
  const notAvailable = "Not Available.";

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [40, 100, 60],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        radius: 120,
        borderColor: "transparent",
        offset: 5,
      },
    ],
  };
  const displayData = [
    {
      label: "Total Rooms",
      value: 100,
    },
    {
      label: "Occupied Rooms",
      value: 40,
    },
    {
      label: "Unoccupied Rooms",
      value: 60,
    },
  ];

  return (
    // <Slide in={true} direction="right">
    <Container disableGutters maxWidth="xl">
      <NavbarDrawer title="dashboard">
        <AccountMenu />
      </NavbarDrawer>
      <Container maxWidth="lg" sx={{ p: 2, pt: 5, pb: 5 }} disableGutters>
        <Grid container spacing={2} style={{ alignItems: "center" }}>
          <Grid item lg={3} md={4} xs={12}>
            <Box
              elevation={0}
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="button "
                textAlign="center"
                color="text.secondary"
              >
                Rooms
              </Typography>
              <Box
                sx={{
                  height: 270,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBotton: 2,
                }}
              >
                <Pie data={data} />
              </Box>
              {/* <Typography
                variant="overline "
                textAlign="center"
                color="text.secondary"
              >
                Total
              </Typography> */}
            </Box>
          </Grid>

          <Grid item lg={9} md={8} xs={12}>
            <Slide in={true} direction="left">
              <Box>
                {boardinghouseError && (
                  <Typography variant="overline" color="initial">
                    {boardinghouseError}
                  </Typography>
                )}
                {isBoardinghousePending && <LoadingState />}
                {boardinghouse && (
                  <Card
                    sx={{ p: 0, pt: 0 }}
                    style={{ borderRadius: 10 }}
                    variant="outlined"
                  >
                    <CardHeader
                      style={{ paddingBottom: 0 }}
                      title={
                        <Typography variant="h5" color="initial">
                          {boardinghouse.bh_name ?? notAvailable}
                        </Typography>
                      }
                      subheader={
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ fontSize: 13 }}
                        >
                          POPULARITY:{" "}
                          {boardinghouse.bh_popularity ?? notAvailable}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1" color="text.secondary">
                        ADDRESS:{" "}
                        <Typography
                          variant="body1"
                          component="span"
                          color="initial"
                        >
                          {boardinghouse.bh_complete_address ?? notAvailable}
                        </Typography>
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        CONTACT NUMBER:{" "}
                        <Typography
                          variant="body1"
                          component="span"
                          color="initial"
                        >
                          {boardinghouse.bh_contacts}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Slide>
          </Grid>
        </Grid>
        <Box sx={{ pt: 2 }}>
          <Slide in={true} direction="right">
            <Grid container spacing={2}>
              {displayData.map((data) => (
                <Grid item md={4} xs={12} key={data.label}>
                  <Paper
                    variant="outlined"
                    style={{
                      height: 220,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ fontSize: "7rem", lineHeight: "8rem" }}
                      color="text.secondary"
                    >
                      {data.value}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {data.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Slide>
        </Box>
        how many rooms, rooms Available, Rooms not available, Boarding house
        stars and name
        {/* <Map /> */}
      </Container>
    </Container>
    //</Slide>
  );
};

export default Dashboard;
