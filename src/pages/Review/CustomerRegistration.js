import { Box, Container, CssBaseline, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomerRegistartionLinearStepper from "./CustomerRegistartionLinearStepper";

  
export default function CustomerRegistration() {
  const history = useHistory()
  useEffect(()=>{
    if ((JSON.parse(localStorage.getItem('customer_details'))?.customerToken?.split('')?.length > 0)) {
      history.push(`/place_order/${JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id}`)
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
            <CustomerRegistartionLinearStepper />
          </div>
        </Paper>
      </Container>
    </>
  )
}
