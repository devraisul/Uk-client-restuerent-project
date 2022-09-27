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
  const { control,formState:{errors} } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <TextField
          style={{
            display:'none'
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
          required:"* First name is required"
        }}
        render={({ field }) => (
          <TextField
            id="customer_name"
            label="Full Name"
            variant="outlined"
            type={'text'}
            placeholder="Enter Your Name"
            required
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        rules={{
          required:"* Phone number mustbe have 11 digit (require)",
          minLength:11,
          maxLength:11
        }}
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            type={'text'}
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
          required:"* Please Enter Your Address (require)",
        }}
        render={({ field }) => (
          <TextField
            id="address"
            label="Address"
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
  const { control,formState:{errors} } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="remarks"
        rules={{
          required:"* Remarks is required"
        }}
        render={({ field }) => (
          <TextField
            id="remarks"
            label="Remarks"
            variant="outlined"
            placeholder="remarks"
            type={'text'}
            fullWidth
            required
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="table_number"
        rules={{
          required:"* Table Number is required"
        }}
        render={({ field }) => (
          <TextField
            id="table_number"
            label="Table Number"
            variant="outlined"
            placeholder="Table Number"
            type={'number'}
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.password?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="type"
        rules={{
          required:"* Type is required"
        }}
        render={({ field }) => (
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            placeholder="Type"
            type={'number'}
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.password?.message}
          />
        )}
      />
      
    </>
  );
};

function getStepContent(step) {
  console.log(step);
  switch (step) {
    case 0:
      return <ContactForm />;
    case 1:
      return <SecurityForm />;
    default:
      return "unknown step";
  } 
}

const PlaceOrderLinearStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      amount: JSON.parse(localStorage.getItem('order-details'))?.price,

      customer_name: JSON.parse(localStorage.getItem('customer_details'))[0]?.customer?.first_Name,
      phone: JSON.parse(localStorage.getItem('customer_details'))[0]?.customer?.phone,
      address: "",
      
      remarks: "",
      table_number: "",
      type: "",
      
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useAuth();
  const history = useHistory();
  const steps = getSteps();


  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      // customerRegister(data).then((res) => {
        // setUser(res.data.user);
        // setIsLoading(false);
        // console.log(res);
        // setActiveStep(activeStep + 1);
        // setTimeout(() => history.push("/addrestaurent"), 2000);
      // });
    } else {
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
      display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
    }}>
      <h1
        style={{
          textAlign: "center",
          color: "#536dfe",
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
              <StepLabel style={{width:'150px'}} {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        <span
        style={{
          fontWeight:'bold',
          fontSize:'2rem',
          color:'gray'
        }}
        >Total: £{JSON.parse(localStorage.getItem('order-details'))?.price}</span>
      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
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
                disabled={isLoading?true:false}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isLoading?"...":(activeStep === steps.length - 1 ? "Finish" : "Next")}
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
