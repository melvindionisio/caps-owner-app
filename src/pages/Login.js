import { makeStyles } from "@mui/styles";
import {
   Container,
   Box,
   Typography,
   TextField,
   Card,
   CardActions,
   CardHeader,
   CardContent,
   Zoom,
   Alert,
   IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import logo from "../sns-logo.png";
import { pink } from "@mui/material/colors";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { domain } from "../fetch-url/fetchUrl";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
   const [showAlert, setShowAlert] = useState(false);

   const [isLoginPending, setIsLoginPending] = useState(false);
   const { setIsOwnerLoggedIn, setCurrentOwner } = useContext(LoginContext);

   const [showPassword, setIsShowPassword] = useState(false);

   const handleClickShowPassword = () => {
      setIsShowPassword(!showPassword);
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   useEffect(() => {
      setTimeout(() => {
         if (showAlert) {
            setShowAlert(false);
         }
      }, 5000);
   }, [showAlert]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoginPending(true);

      fetch(`${domain}/api/owners/auth`, {
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
            if (data.error === "success") {
               setIsOwnerLoggedIn(true);
               setCurrentOwner({
                  id: data.bho_id,
                  name: data.bho_name,
                  username: data.bho_username,
                  hash: data.bho_password,
                  token: password,
               });

               setIsLoginPending(true);
               console.log(data.message);
               history.push("/my/dashboard");
            } else if (data.error === "incorrect") {
               setMessage(data.message);
               setShowAlert(true);

               setIsLoginPending(false);
            } else {
               setShowAlert(true);
               setMessage(data.message);
               setIsLoginPending(false);
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
                  <Card
                     variant="outlined"
                     sx={{ padding: "1.5rem 0rem 0rem 0rem" }}
                  >
                     <CardHeader
                        title={
                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                              }}
                           >
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
                              textAlign="center"
                           >
                              SEARCH 'N STAY
                           </Typography>
                        }
                     />
                     <CardContent>
                        <TextField
                           name="username"
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
                        <Box sx={{ position: "relative" }}>
                           <TextField
                              name="password "
                              label="Password"
                              fullWidth
                              variant="filled"
                              color="primary"
                              required
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                           <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{
                                 position: "absolute",
                                 top: "50%",
                                 right: 3,
                                 mr: 0.5,
                                 transform: "translateY(-50%)",
                              }}
                           >
                              {showPassword ? (
                                 <VisibilityOff />
                              ) : (
                                 <Visibility />
                              )}
                           </IconButton>
                        </Box>

                        <Alert
                           severity="warning"
                           sx={
                              showAlert
                                 ? { display: "flex", mt: 2 }
                                 : { display: "none", mt: 2 }
                           }
                        >
                           {message}
                        </Alert>
                     </CardContent>
                     <CardActions className={classes.cardActions}>
                        <LoadingButton
                           variant="contained"
                           color="primary"
                           type="submit"
                           size="large"
                           fullWidth
                           loading={isLoginPending}
                        >
                           Login as owner
                        </LoadingButton>
                     </CardActions>
                  </Card>
               </form>
            </Box>
         </Container>
      </Zoom>
   );
};

export default Login;
