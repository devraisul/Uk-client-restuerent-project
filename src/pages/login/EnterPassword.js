import { Box, Button, CircularProgress, Container, Fade, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useHistory, useParams } from 'react-router-dom';
import { updatePassAPI } from '../../Apis/Auth';
import useStyles from "./styles";







export default function EnterPassword() {
  const { token } = useParams()
  var classes = useStyles();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [passRevil, setPassRevil] = useState(false)
  const history = useHistory()
  useEffect(() => {
    console.log(newPassword);
  }, [newPassword])
  
  const handleUpdatePass = () => {
    setIsLoading(true)
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
    }
    else {
      setIsLoading(true);
      const newData = {
        password: newPassword,
      };
      updatePassAPI(token, newData)
        .then((res) => {
          toast.success(res?.data?.message);
          setIsLoading(false);

          setTimeout(() => {
            history.push("/login");
          }, 2000);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err?.message);
        });;
    }
  }


  const handleShowPassword = () => {
    const password = document.getElementById("password");

    if (password.type === "password") {
      password.type = "text";
      setPassRevil(true)
    } else {
      password.type = "password";
      setPassRevil(false)
    }
  };

  return (
    <Container component={Box}>
      <Toaster position="top-right" reverseOrder={false} />
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
                      *** There is Something wrong with your account ***
                    </Typography>
                  </Fade>
                )}

                <form>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#0575B4",
                    }}
                  >
                    Forgot Password?
                  </h1>
                  <div
                    style={{
                      position: "relative",
                    }} >
                    <TextField
                      id="password"
                      name="password"
                      margin="normal"
                      variant="outlined"
                      placeholder="Type New Password"
                      type="password"
                      label="password"
                      fullWidth
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    {!passRevil ? (<RiEyeCloseLine
                      style={{
                        color: "#0575B4",
                        cursor: "pointer",
                        position: "absolute",
                        top: "45%",
                        right: "5%",
                        fontSize: '1.3rem'
                      }}
                      onClick={handleShowPassword}
                    />) : (
                      <RiEyeLine
                        style={{
                          color: "#0575B4",
                          cursor: "pointer",
                          position: "absolute",
                          top: "45%",
                          right: "5%",
                          fontSize: '1.3rem'
                        }}
                        onClick={handleShowPassword}
                      />
                    )}
                  </div>
                  <div
                    className={classes.formButtons}
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress
                        size={26}
                        className={classes.loginLoader}
                      />
                    ) : (
                      <Button
                        onClick={handleUpdatePass}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Change Password
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
  )
}
