import {
  Button, Step,
  StepLabel, Stepper, TextField, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState } from "react";
import {
  Controller,
  FormProvider, useForm, useFormContext
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
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            required
            type={'text'}
            margin="normal"
            {...field}
            helperText={errors?.first_Name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="last_Name"
        rules={{
          required: "* Last name is required"
        }}
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
            helperText={errors?.last_Name?.message}

          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
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
            type={'email'}
            placeholder="Enter Your E-mail Address"
            required
            fullWidth
            margin="normal"
            {...field}
            helperText={errors?.email?.message}
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
          <>
            {console.log(errors)}
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              type='number'
              placeholder="Enter Your 11 Digit Phone Number"
              fullWidth
              margin="normal"
              {...field}
              helperText={
                (errors?.phone?.type === 'maxLength'&& '* Phone number mustbe have 11 digit (require)')||
                (errors?.phone?.type === 'minLength'&& '* Phone number mustbe have 11 digit (require)')
              }
            />
          </>
        )}
      />
    </>
  );
};
const SecurityForm = () => {
  const handleShowPassword = () => {
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "* Password is required",
        }}
        render={({ field }) => (
          <div
            style={{
              position: "relative",
            }}
          >
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              type={"password"}
              fullWidth
              margin="normal"
              {...field}
              helperText={errors?.password?.message}
            />
            <VisibilityIcon
              onClick={handleShowPassword}
              style={{
                position: "absolute",
                left: "93%",
                top: "40%",
                color: "#536dfe",
                cursor: "pointer",
              }}
            />
          </div>
        )}
      />
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            placeholder="Owner"
            type={"text"}
            required
            disabled
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
    if (activeStep == steps.length - 1) {
      setIsLoading(true);
      userRegister(data).then((res) => {
        setUser(res.data.user);
        setIsLoading(false);
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
              <StepLabel style={{
                width: '150px'
              }} {...labelProps}>{step}</StepLabel>
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
            <form onSubmit={methods.handleSubmit(handleNext)} style={{
              width: '81%',
            }}>
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
                  disabled={isLoading ? true : false}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
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

export default RegistartionLinearStepper;
