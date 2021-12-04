import { makeStyles } from "@mui/styles";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Zoom,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import logo from "../sns-logo.png";
import { pink } from "@mui/material/colors";
import React, { useState } from "react";

const useStyles = makeStyles({
  sns_logo: {
    height: "5rem",
    width: "5rem",
  },
  cardActions: {
    padding: "0rem 1rem 1rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appname: {
    position: "relative",
    "&::after": {
      content: '"owner"',
      display: "block",
      fontSize: ".7rem",
      background: pink[400],
      position: "absolute",
      top: "0",
      right: "1.5rem",
      padding: "0rem .3rem",
      borderRadius: ".5rem",
      color: pink[50],
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3500/api/owners/auth", {
      method: "POST",
      body: JSON.stringify({
        owner_username: userName,
        owner_password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setCurrentUser(data);
        if (data.error === "success") {
          history.push("/my/boarding-house");

          // setIsLogin(true);
          // setUser({
          //   id: data.user_id,
          //   name: data.name,
          //   username: data.username,
          // });

          console.log(data.message);
          console.log(data);
        } else if (data.error === "incorrect") {
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <Zoom in={true}>
      <Container
        maxWidth="sm"
        disableGutters
        sx={{ height: "100vh", position: "relative" }}
      >
        <Box
          align="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Card variant="outlined" sx={{ padding: "1.5rem 0rem 0rem 0rem" }}>
              <CardHeader
                title={
                  <Box>
                    <img
                      src={logo}
                      id="logo"
                      alt="logo"
                      className={classes.sns_logo}
                    />
                  </Box>
                }
                subheader={
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="h2"
                    className={classes.appname}
                  >
                    SEARCH 'N STAY
                  </Typography>
                }
              />
              <CardContent>
                <TextField
                  label="Username"
                  fullWidth
                  variant="filled"
                  color="primary"
                  required
                  autoFocus
                  margin="normal"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  label="Password"
                  fullWidth
                  variant="filled"
                  color="primary"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box>{message}</Box>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  fullWidth
                >
                  Login as owner
                </Button>
              </CardActions>
            </Card>
          </form>
        </Box>
      </Container>
    </Zoom>
  );
};

export default Login;
