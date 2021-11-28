import React from "react";
import { Container, Box, Typography } from "@mui/material";
import NavbarDrawer from "../components/NavbarDrawer";
import {
  CardHeader,
  IconButton,
  Card,
  Grid,
  Paper,
  CardContent,
} from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Dashboard = () => {
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
        <IconButton></IconButton>
      </NavbarDrawer>
      <Container maxWidth="lg" sx={{ p: 2, pt: 5 }} disableGutters>
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
            <Box>
              <Card sx={{ p: 0, pt: 3 }} style={{}} variant="outlined">
                <CardHeader
                  title="Boarding House Name"
                  subheader="Stars here"
                />
                <CardContent>
                  <Typography>Address</Typography>
                  <Typography>Contact number</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            {displayData.map((data) => (
              <Grid item md={4} xs={12}>
                <Paper
                  variant="outlined"
                  style={{
                    height: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
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
        </Box>
        how many rooms, rooms Available, Rooms not available, Boarding house
        stars and name
      </Container>
    </Container>
    //</Slide>
  );
};

export default Dashboard;
