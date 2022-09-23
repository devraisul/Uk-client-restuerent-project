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
// import { customerRegister, userRegister } from "../../Apis/Auth";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));
function getSteps() {
  return ["Contact information", "Security information"];
}
const ContactForm = () => {
  const { control,formState:{errors} } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="first_Name"
        rules={{
          required:"* First name is required"
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
    </>
  );
};
const SecurityForm = () => {
  const { control,formState:{errors} } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={{
          required:"* Email is required"
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
          required:"* Password is required"
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

const CustomerRegistartionLinearStepper = () => {
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

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      // customerRegister(data).then((res) => {
        // setUser(res.data.user);
        // setIsLoading(false);
        // console.log(res);
        setActiveStep(activeStep + 1);
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
              <StepLabel style={{width:'150px'}} {...labelProps}>{step}</StepLabel>
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

export default CustomerRegistartionLinearStepper;
