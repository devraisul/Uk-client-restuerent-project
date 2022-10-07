import { Box, Container, CssBaseline, Paper } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PlaceOrderLinearStepper from "./PlaceOrderLinearStepper";


export default function PlaceOrderForm({ total, cartItem, setOpen }) {
  const history = useHistory();
  useEffect(() => {
    if ((JSON.parse(localStorage.getItem('customer_details'))?.customerToken?.split('')?.length === 0)) {
      history.push('/customer_registration')
    }
  }, [])
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={10}>
        <Paper component={Box} p={4}>
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
            <PlaceOrderLinearStepper
              sum={total}
              cartItem={cartItem}
              setOpen={setOpen}
            />
          </div>
        </Paper>
      </Container>
    </>
  )
}
