import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import logo from "../sns-logo.png";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    position: "relative",
  },
  formContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
  },
  textFields: {
    marginBottom: ".7rem",
  },
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
  card: {
    padding: "1.5rem 0rem",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/my");
  };

  return (
    <Zoom in={true}>
      <Container maxWidth="sm" disableGutters className={classes.container}>
        <Box className={classes.formContainer} align="center">
          <form onSubmit={handleSubmit}>
            <Card variant="outlined" className={classes.card}>
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
                  variant="outlined"
                  className={classes.textFields}
                  color="primary"
                  required
                />
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  className={classes.textFields}
                  color="primary"
                  required
                  type="password"
                />
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
