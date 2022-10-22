import {
  Button, Step,
  StepLabel, Stepper, TextField, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  Controller,
  FormProvider, useForm, useFormContext
} from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { placeOrder } from "../../Apis/placeOrder";
// import { customerRegister, userRegister } from "../../Apis/Auth";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Customer information", "Order information"];
}
const ContactForm = () => {
  const { control, formState: { errors } } = useFormContext();
  console.log(errors?.phone)
  return (
    <>
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <TextField
            style={{
              display: 'none'
            }}
            id="amount"
            variant="outlined"
            type={'number'}
            required
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="customer_name"
        rules={{
          required: "* First name is required"
        }}
        render={({ field }) => (
          <TextField
            defaultValue={JSON.parse(localStorage.getItem('customer_details'))?.customer?.first_Name}
            error={errors?.customer_name && true}
            id="customer_name"
            label="Full Name *"
            variant="outlined"
            type={'text'}
            placeholder="Enter Your Name"
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.customer_name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        rules={{
          required: "* Your phone number must be 11 digit (require)",
          minLength: { value: 11, message: "Your phone number must be 11 digit" },
          maxLength: { value: 11, message: "Your phone number must be 11 digit" }
        }}
        render={({ field }) => (

          <TextField
            error={errors?.phone && true}
            id="phone-number"
            label="Phone Number *"
            variant="outlined"
            type={'number'}
            placeholder="Enter Your 11 Digit Phone Number"
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.phone?.message}
          />

        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{
          required: "* Please Enter Your Address (require)",
        }}
        render={({ field }) => (
          <TextField
            error={errors?.address && true}
            id="address"
            label="Address *"
            variant="outlined"
            type={'text'}
            placeholder="Enter Your Address"
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.address?.message}
          />
        )}
      />
    </>
  );
};
const SecurityForm = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="remarks"
        render={({ field }) => (
          <TextField
            id="remarks"
            label="Remarks"
            variant="outlined"
            placeholder="remarks"
            type={'text'}
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="table_number"
        rules={{
          required: "* Table Number is required"
        }}
        render={({ field }) => (
          <TextField
            error={errors?.table_number && true}
            id="table_number"
            label="Table Number *"
            variant="outlined"
            placeholder="Table Number"
            type={'number'}
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.table_number?.message}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ContactForm />;
    case 1:
      return <SecurityForm />;
    default:
      return "unknown step";
  }
}

const PlaceOrderLinearStepper = ({ sum, cartItem, setOpen }) => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      amount: sum ? sum : 0,
      customer_name: JSON.parse(localStorage.getItem('customer_details'))[0]?.customer?.first_Name,
      phone: JSON.parse(localStorage.getItem('customer_details'))[0]?.customer?.phone,
      address: "",

      remarks: "",
      table_number: "",
      type: "Dine in",

    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const steps = getSteps();


  const { user } = useAuth()
  console.log(user);
  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      const dishes = cartItem.map(data => {
        const dishe = {
          "Dish_Price": data.price,
          "qty": data.quantity,
          "id": data.id,
          "variation": data.variations
        }
        return dishe;
      })

      placeOrder(user?.restaurant[0]?.id, data, dishes)
        .then((res) => {
          console.log(res);
          setIsLoading(false);

          setActiveStep(activeStep + 1);
          localStorage.removeItem("cart_items")
          setTimeout(() => setOpen(false), 2000);
        }
        );
    }
    else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep),
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1
        style={{
          textAlign: "center",
          color: "#0575B4",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Place Order
      </h1>

      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel style={{ width: '150px' }} {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {!(activeStep === steps.length) &&
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '2rem',
            color: 'gray'
          }}
        // >Total: £ {JSON.parse(localStorage.getItem('order-details'))?.price ? JSON.parse(localStorage.getItem('order-details'))?.price : 0}</span>
        >Total: £ {sum ? sum : 0}</span>
      }

      {activeStep === steps.length ? (
        <Typography style={{
          margin: '50px 0px'
        }} variant="h2" align="center" >
          Your order is taken successfully. ✅
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Go
                  <NavLink
                    to={"/login"}
                    style={{
                      color: "#536dfe",
                    }}
                  >
                    {" "}
                    Back?
                  </NavLink>
                </div>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>

                <Button
                  disabled={isLoading ? true : false}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isLoading ? "..." : (activeStep === steps.length - 1 ? "Finish" : "Next")}
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default PlaceOrderLinearStepper;
