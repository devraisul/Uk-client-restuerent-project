import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { changePass } from '../../Apis/Auth';
import useStyles from "./styles";

const ChangePass = () => {
  const [passRevil, setPassRevil] = useState(false)
  const [cpassRevil, setCPassRevil] = useState(false)
  const [c2passRevil, setC2PassRevil] = useState(false)

  var classes = useStyles();

  const hadleLogin = (e) => {
    e.preventDefault();

    if (e.target.newpassword.value === e.target.confirmpassword.value) {
      const data = {
        "password": e.target.newpassword.value,
        "cpassword": e.target.currentpassword.value
      }
      changePass(data)
        .then((res) => {
          toast.success('Successfully Password Changed');
        })
        .catch(err => {
          toast.error(err.response.data.message);
        })
    }
    else {
      toast.error('Password Did not match');
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

  const handleShowCPassword = () => {
    const password = document.getElementById("cpassword");

    if (password.type === "password") {
      password.type = "text";
      setCPassRevil(true)
    } else {
      password.type = "password";
      setCPassRevil(false)
    }
  };

  const handleShowC2Password = () => {
    const password = document.getElementById("c2password");

    if (password.type === "password") {
      password.type = "text";
      setC2PassRevil(true)
    } else {
      password.type = "password";
      setC2PassRevil(false)
    }
  };
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <React.Fragment>
        <form onSubmit={hadleLogin} style={{ width: "30%", margin: "50px auto" }}>
          <div style={{ position: 'relative' }}>
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              variant="outlined"
              name="currentpassword"
              margin="normal"
              placeholder="Current Password"
              type="password"
              fullWidth
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

          <div style={{ position: 'relative' }}>
            <TextField
              id="cpassword"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              variant="outlined"
              name="newpassword"
              margin="normal"
              placeholder="New Password"
              type="password"
              fullWidth
            />
            {!cpassRevil ? (<RiEyeCloseLine
              style={{
                color: "#0575B4",
                cursor: "pointer",
                position: "absolute",
                top: "45%",
                right: "5%",
                fontSize: '1.3rem'
              }}
              onClick={handleShowCPassword}
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
                onClick={handleShowCPassword}
              />
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <TextField
              id="c2password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              variant="outlined"
              name="confirmpassword"
              margin="normal"
              placeholder="Confirm Password"
              type="password"
              fullWidth
            />
            {!c2passRevil ? (<RiEyeCloseLine
              style={{
                color: "#0575B4",
                cursor: "pointer",
                position: "absolute",
                top: "45%",
                right: "5%",
                fontSize: '1.3rem'
              }}
              onClick={handleShowC2Password}
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
                onClick={handleShowC2Password}
              />
            )}
          </div>
          <div className={classes.formButtons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Change
            </Button>
          </div>
        </form>
      </React.Fragment>
    </>
  );
};

export default ChangePass;