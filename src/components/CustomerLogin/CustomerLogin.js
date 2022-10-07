import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  CssBaseline,
  Container,
  Paper,
  Box,
} from "@material-ui/core";
import { NavLink, useHistory, withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";
import { useAuth } from "../../context/AuthContext";
import { userLogin } from "../../Apis/Auth";


function CustomerLogin(props) {
  var classes = useStyles();

  // global
  const { setIsAuthenticated, setUser } = useAuth();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  let history = useHistory();

  const hadleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    userLogin(data)
      .then((res) => {
        localStorage.setItem("customer_details", res.data)
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err?.message);
      });
  };

  return (
    <Container component={Box}>
      <Grid className={classes.container}>
        <Paper component={Box} p={3}>
          <div>
            <div className={classes.form}>
              <React.Fragment>
                {error && (
                  <Fade in={error}>
                    <Typography
                      color="secondary"
                      className={classes.errorMessage}
                    >
                      ***Your email or password is incorrect.***
                    </Typography>
                  </Fade>
                )}

                <form onSubmit={hadleLogin}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#536dfe",
                    }}
                  >
                    Login
                  </h1>
                  <TextField
                    id="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    placeholder="Email Adress"
                    type="email"
                    label="email"
                    fullWidth
                  />

                  <TextField
                    id="password"
                    variant="outlined"
                    name="password"
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    label="password"
                    fullWidth
                  />

                  <div>
                    Don't have an accoun?
                    <NavLink
                      to={"/registration"}
                      style={{
                        color: "#536dfe",
                      }}
                    >
                      {" "}
                      Create Account.
                    </NavLink>
                  </div>

                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress
                        size={26}
                        className={classes.loginLoader}
                      />
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Login
                      </Button>
                    )}
                  </div>
                </form>
              </React.Fragment>
            </div>
          </div>
        </Paper>
      </Grid>
    </Container>
  );
}

export default CustomerLogin;
