// import { Button, CircularProgress, Fade, Grid, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import RegistartionLinearStepper from "./RegistartionLinearStepper";

  
export default function Registration() {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={4}>
          <div
            style={{
              padding: "0px 50px",
            }}
          >
            <RegistartionLinearStepper />
          </div>
        </Paper>
      </Container>
    </>
  )
}
