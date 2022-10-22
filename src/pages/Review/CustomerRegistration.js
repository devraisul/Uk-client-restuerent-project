import { Box, Container, CssBaseline } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomerRegistartionLinearStepper from "./CustomerRegistartionLinearStepper";


export default function CustomerRegistration({ total }) {
  const history = useHistory()
  useEffect(() => {
    if ((JSON.parse(localStorage.getItem('customer_details'))?.customerToken?.split('')?.length > 0)) {
      history.push(`/place_order/${JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id}`)
    }
  }, [])
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={10}>
        
          <div
            style={{
              padding: "0px 50px",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: "100%",
              height: "60vh"
            }}
          >
            <CustomerRegistartionLinearStepper
              sum={total}
            />
          </div>
        
      </Container>
    </>
  )
}
