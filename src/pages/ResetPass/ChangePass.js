import { Button, CircularProgress, Fade, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { changePass } from '../../Apis/Auth';
import useStyles from "./styles";
import toast, { Toaster } from 'react-hot-toast';

const ChangePass = () => {
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
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <React.Fragment>
        <form onSubmit={hadleLogin} style={{ width: "30%", margin: "50px auto" }}>
          <TextField
            id="password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            name="currentpassword"
            margin="normal"
            placeholder="Current Password"
            type="password"
            fullWidth
          />
          <TextField
            id="password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            name="newpassword"
            margin="normal"
            placeholder="New Password"
            type="password"
            fullWidth
          />
          <TextField
            id="password"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            name="confirmpassword"
            margin="normal"
            placeholder="Confirm Password"
            type="password"
            fullWidth
          />
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