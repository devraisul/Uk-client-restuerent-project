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
import toast, { Toaster } from "react-hot-toast";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import { userLogin, userRegister } from "../../Apis/Auth";
import { useAuth } from "../../context/AuthContext";

function Login(props) {
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
    userLogin(data)
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response?.data?.message);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.pass.value === e.target.confirm_Pass.value) {
      const data = {
        first_Name: e.target.first_Name.value,
        last_Name: e.target.last_Name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.pass.value,
        type: "restaurant_Owner",
      };
      console.log(data);
      userRegister(data).then((res) => {
        setUser(res.data.user);
        history.push("/addrestaurent");
        setIsLoading(false);
      });
    } else {
      setError(true);
    }
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
                      Something is wrong with your login or password :(
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
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
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
                    InputProps={{
                      classes: {
                        // underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
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
                    <NavLink to={"/addrestaurent"} style={{
                      color:'#536dfe'
                    }}> Create Account.</NavLink>
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

              {
                // activeTabId === 1 &&
                // <React.Fragment>
                //   <form onSubmit={handleRegister}>
                //     {/* <Typography variant="h1" className={classes.greeting}>
                //     Welcome!
                //   </Typography> */}
                //     {/* <Typography variant="h2" className={classes.subGreeting}>
                //     Create your account
                //   </Typography> */}
                //     <Fade in={error}>
                //       <Typography
                //         color="secondary"
                //         className={classes.errorMessage}
                //       >
                //         Something is wrong with your login or password :(
                //       </Typography>
                //     </Fade>
                //     <TextField
                //       id="name"
                //       InputProps={{
                //         classes: {
                //           underline: classes.textFieldUnderline,
                //           input: classes.textField,
                //         },
                //       }}
                //       name="first_Name"
                //       margin="normal"
                //       placeholder="First Name"
                //       type="text"
                //       fullWidth
                //     />
                //     <TextField
                //       id="name"
                //       InputProps={{
                //         classes: {
                //           underline: classes.textFieldUnderline,
                //           input: classes.textField,
                //         },
                //       }}
                //       name="last_Name"
                //       margin="normal"
                //       placeholder="Last Name"
                //       type="text"
                //       fullWidth
                //     />
                //     <TextField
                //       id="name"
                //       InputProps={{
                //         classes: {
                //           underline: classes.textFieldUnderline,
                //           input: classes.textField,
                //         },
                //       }}
                //       name="phone"
                //       margin="normal"
                //       placeholder="Phone Number"
                //       type="number"
                //       fullWidth
                //     />
                //     <TextField
                //       id="email"
                //       InputProps={{
                //         classes: {
                //           underline: classes.textFieldUnderline,
                //           input: classes.textField,
                //         },
                //       }}
                //       name="email"
                //       margin="normal"
                //       placeholder="Email Adress"
                //       type="email"
                //       fullWidth
                //     />
                //     <TextField
                //       id="password"
                //       InputProps={{
                //         classes: {
                //           underline: classes.textFieldUnderline,
                //           input: classes.textField,
                //         },
                //       }}
                //       name="pass"
                //       margin="normal"
                //       placeholder="Password"
                //       type="password"
                //       fullWidth
                //     />
                //     <TextField
                //       id="password"
                //       InputProps={{
                //         classes: {
                //           underline: classes.textFieldUnderline,
                //           input: classes.textField,
                //         },
                //       }}
                //       name="confirm_Pass"
                //       margin="normal"
                //       placeholder="Confirm Password"
                //       type="password"
                //       fullWidth
                //     />
                //     <div className={classes.creatingButtonContainer}>
                //       {isLoading ? (
                //         <CircularProgress size={26} />
                //       ) : (
                //         <Button
                //           type="submit"
                //           // disabled={
                //           //   loginValue.length === 0 ||
                //           //   passwordValue.length === 0 ||
                //           //   nameValue.length === 0
                //           // }
                //           size="large"
                //           variant="contained"
                //           color="primary"
                //           fullWidth
                //           className={classes.createAccountButton}
                //         >
                //           Create your account
                //         </Button>
                //       )}
                //     </div>
                //   </form>
                // </React.Fragment>
              }
            </div>
          </div>
        </Paper>
      </Grid>
    </Container>
  );
}

export default withRouter(Login);
