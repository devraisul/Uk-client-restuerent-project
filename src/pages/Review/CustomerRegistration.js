import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import CustomerRegistartionLinearStepper from "./CustomerRegistartionLinearStepper";

  
export default function CustomerRegistration() {
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
            <CustomerRegistartionLinearStepper />
          </div>
        </Paper>
      </Container>
    </>
  )
}
