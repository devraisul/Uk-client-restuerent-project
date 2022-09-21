import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { userRegister } from "../../Apis/Auth";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Basic information", "Contact information", "Security information"];
}
const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="first_Name"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            required
            type={'text'}
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="last_Name"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            type={'text'}
            required
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            type={'email'}
            placeholder="Enter Your E-mail Address"
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
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            type={'text'}
            required
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const SecurityForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
            type={'password'}
            required
            fullWidth
            margin="normal"
            {...field}
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
      return <BasicForm />;
    case 1:
      return <ContactForm />;
    case 2:
      return <SecurityForm />;
    default:
      return "unknown step";
  }
}

const RegistartionLinearStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      first_Name: "",
      last_Name: "",
      email: "",
      phone: "",
      password: "",
      type: "restaurant_Owner",
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
      userRegister(data).then((res) => {
        setUser(res.data.user);
        setIsLoading(false);

        console.log(res);
        setActiveStep(activeStep + 1);
        setTimeout(() => history.push("/addrestaurent"), 2000);
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
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "#536dfe",
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
              <StepLabel {...labelProps}>{step}</StepLabel>
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
                    to={"/login"}
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
                >
                  back
                </Button>
                
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default RegistartionLinearStepper;
