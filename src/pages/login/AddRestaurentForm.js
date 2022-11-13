// import { Button, CircularProgress, Fade, Grid, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { Box, Container, CssBaseline, Paper } from "@material-ui/core";
import React from "react";
import AddRestaurentLinearStepper from "./AddRestaurentLinearStepper";

const AddRestaurentForm = () => {
  
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={10}>
        <Paper component={Box} p={4}>
          <div
            style={{
              padding: "0px 50px",
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <AddRestaurentLinearStepper />
          </div>
        </Paper>
      </Container>
    </>
    
  );
};

export default AddRestaurentForm;
