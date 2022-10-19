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
          <div style={{width:'400px'}}>
          <NavLink style={{fontSize:'1.5rem',color:'#0575B4'}} to={'/login'}>
              <BiArrowBack />
            </NavLink>
            <div style={{width:'100%'}} className={classes.form}>
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
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "#0575B4",
                      fontSize:'1.9rem',
                      margin:'10px 0px'
                    }}
                  >
                   Forgotten your password?
                  </h1>
                  <p style={{marginBottom:'20px'}}>Don't worry, just enter your registered email address and we'll send you a link to reset your password</p>
                    <TextField
                      id="email"
                      name="email"
                      margin="normal"
                      variant="outlined"
                      placeholder="Email Adress"
                      type="email"
                      label="email"
                      fullWidth
                      required
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
