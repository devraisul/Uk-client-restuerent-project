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
import Popup from "reactjs-popup";
// import { customerRegister, userRegister } from "../../Apis/Auth";
import { customerRegister } from "../../Apis/Auth";
import { useAuth } from "../../context/AuthContext";
import PlaceOrderForm from "./PlaceOrderForm";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));
function getSteps() {
  return ["Contact information", "Security information"];
}
const ContactForm = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="first_Name"
        rules={{
          required: "* First name is required"
        }}
        render={({ field }) => (
          <TextField
            id="first_Name"
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
          required: "* Phone number mustbe have 11 digit (require)",
          minLength: 11,
          maxLength: 11
        }}
        render={({ field }) => (
          <TextField
            id="phonenumber"
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
    </>
  );
};
const SecurityForm = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "* Email is required"
        }}
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="email"
            type={'email'}
            fullWidth
            required
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: "* Password must be minimum 6 digit required",
          minLength: 6
        }}
        render={({ field }) => (
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
            type={'password'}
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
const CustomerRegistartionLinearStepper = ({ sum }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      first_Name: "",
      email: "",
      phone: "",
      password: "",
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

  const handleNext = async (data) => {
    if (activeStep == steps.length - 1) {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      customerRegister(data).then((res) => {
        setIsLoading(false);
        localStorage.setItem('customer_details', JSON.stringify([{
          customer: res.data.user,
          customerToken: res.token
        }]))
        if (res.token) {
          setActiveStep(activeStep + 1);
          // setTimeout(() => history.push("/place_order"), 1000);
          setTimeout(() => setOpen(true), 1000);
        }
      });
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <button className="close" onClick={(e) => setOpen(false)}>
          &times;
        </button>
        <PlaceOrderForm
          total={sum}
        />
      </Popup>
      <h1
        style={{
          textAlign: "center",
          color: "#0575B4",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Create An Account
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
                  Already have an accoun?
                  <NavLink
                    to={"/customerlogin"}
                    style={{
                      color: "#536dfe",
                    }}
                  >
                    {" "}
                    Login.
                  </NavLink>
                </div>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >back</Button>
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

export default CustomerRegistartionLinearStepper;
