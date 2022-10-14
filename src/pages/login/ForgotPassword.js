import {
  Box, Button, CircularProgress, Container, Fade, Grid, Paper, TextField, Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { NavLink, useHistory, withRouter } from "react-router-dom";


// styles
import useStyles from "./styles";

// context
import { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { forgotPass } from "../../Apis/Auth";

function ForgotPassword(props) {
  var classes = useStyles();
  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  const history = useHistory()
  const hadleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
    };
    forgotPass(data)
      .then((res) => {
        if(res.data.message){
          setIsLoading(false);
          history.push('/forgot-password-email-send')
        setError("")
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err?.message);
      });
  };

  return (
    <Container component={Box}>
      <Toaster position="top-right" reverseOrder={false} />
      <Grid className={classes.container}>
        <Paper component={Box} p={3}>
          <div>
          <NavLink style={{fontSize:'1.5rem',color:'#0575B4'}} to={'/login'}>
              <BiArrowBack />
            </NavLink>
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

                <form onSubmit={hadleLogin}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#0575B4",
                    }}
                  >
                    Forgot Password?
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
                  {/* Don't remember your password? */}
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
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                        >
                          Submit
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

export default withRouter(ForgotPassword);
