import React, {  useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
  Container,
  Paper,
  Box,
} from "@material-ui/core";
import {withRouter } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";


// styles
import useStyles from "./styles";

// context
import { forgotPass, updatePassAPI, } from "../../Apis/Auth";
import toast, { Toaster } from "react-hot-toast";

function ForgotPassword(props) {
  var classes = useStyles();



  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  const [updatePass, setUpdatePass] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const[passwordToken, setPasswordToken] = useState("");
  const [changeButton, setChangeButton] = useState(false);



  const hadleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
    };
    
    forgotPass(data)
      .then((res) => {
          setUpdatePass(true);
        setPasswordToken(res?.data?.token);
        setChangeButton(!changeButton);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err?.message);
      });
  };

  const handleUpdatePass = () => {
   if(newPassword.length < 6){
    setError("Password must be at least 6 characters");
   }
    else{
         setIsLoading(true);
         const newData = {
           password: newPassword,
         };
         updatePassAPI(passwordToken, newData)
           .then((res) => {
           toast.success(res?.data?.message);
            //  alert(res?.data?.message);
             setIsLoading(false);
              // make a settime out here
            setTimeout(() => {
                props.history.push("/login");
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
    } else {
      password.type = "password";
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

                <form onSubmit={hadleLogin}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#536dfe",
                    }}
                  >
                    Forgot Password?
                  </h1>
                  {!updatePass ? (
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
                  ) : (
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
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
                      <VisibilityIcon
                        style={{
                          color: "#536dfe",
                          cursor: "pointer",
                          position: "absolute",
                          top: "40%",
                          left: "88%",
                        }}
                        onClick={handleShowPassword}
                      />
                    </div>
                  )}

                  {/* Don't remember your password? */}

                  {!changeButton ? (
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
                  ) : (
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
                  )}
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
