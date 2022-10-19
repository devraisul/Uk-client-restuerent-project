import {
  Box, Button, CircularProgress, Container, Fade, Grid, Paper, TextField, Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { NavLink, withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";

// context
import { userLogin } from "../../Apis/Auth";
import { useAuth } from "../../context/AuthContext";

function Login(props) {
  var classes = useStyles();
  const { setIsAuthenticated, setUser } = useAuth();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  const [passRevil, setPassRevil] = useState(false)


  const hadleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // console.log(data);
    userLogin(data)
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Email or password incorrect!");
      });
  };

  const handleShowPassword = () => {

    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
      setPassRevil(true)
    } else {
      password.type = "password";
      setPassRevil(false)
    }
  }

  return (
    <Container component={Box}>
      <Grid className={classes.container}>
        <Paper component={Box} p={3}>
          <div>
            <div className={classes.form}>
              <React.Fragment>
                
                <form onSubmit={hadleLogin}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#0575B4",
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

                  <div
                    style={{
                      position: "relative",
                    }}
                  >
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
                    {!passRevil?(<RiEyeCloseLine
                      style={{
                        color: "#0575B4",
                        cursor: "pointer",
                        position: "absolute",
                        top: "45%",
                        right: "5%",
                        fontSize:'1.3rem'
                      }}
                      onClick={handleShowPassword}
                    />):(
                      <RiEyeLine
                      style={{
                        color: "#0575B4",
                        cursor: "pointer",
                        position: "absolute",
                        top: "45%",
                        right: "5%",
                        fontSize:'1.3rem'
                      }}
                      onClick={handleShowPassword}
                    />
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "-10px",
                    }}
                  >
                    <NavLink
                      to={"/forgot-password"}
                      style={{
                        color: "#0575B4",
                        borderBottom: "1px solid #0575B4",
                      }}
                    >
                      Don't remember your password?
                    </NavLink>
                  </div>
                  {error && (
                  <Fade in={error}>
                    <Typography
                      color="secondary"
                      style={{fontSize:'0.8rem',marginTop:'20px'}}
                    >
                      {`* ${error}`}
                    </Typography>
                  </Fade>
                )}
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
                  <div style={{
                    textAlign:'center',
                    marginTop:'15px'
                  }}>
                    Don't have an accoun?
                    <NavLink
                      to={"/registration"}
                      style={{
                        color: "#0575B4",
                        
                      }}
                    >
                      {" "}
                      Create Account.
                    </NavLink>
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
