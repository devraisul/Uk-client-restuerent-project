import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PlaceOrderLinearStepper from "./PlaceOrderLinearStepper";

  
export default function PlaceOrderForm() {
  const history = useHistory();
  useEffect(()=>{
    if (!(JSON.parse(localStorage.getItem('customer_details')).length > 0)) {
      history.push('/customer_registration')
    }
  },[])
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
            <PlaceOrderLinearStepper />
          </div>
        </Paper>
      </Container>
    </>
  )
}
