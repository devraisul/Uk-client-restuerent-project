import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { addRestaurent } from "../../Apis/Restaurent";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Personal Information",
    "Contact Information",
    "Adress Information",
    "Restaurent Website Information",
  ];
}

const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="Name"
        render={({ field }) => (
          <TextField
            type={"text"}
            required
            id="name"
            label="Name"
            variant="outlined"
            placeholder="Enter Your Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="About"
        render={({ field }) => (
          <TextField
            type={"text"}
            id="about"
            label="About"
            variant="outlined"
            placeholder="About"
            fullWidth
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
        name="EmailAddress"
        render={({ field }) => (
          <TextField
            required
            type={"email"}
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="PhoneNumber"
        render={({ field }) => (
          <TextField
            type={"number"}
            required
            id="phone-number"
            label="Phone Number"
            variant="outlined"
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
const AboutForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="Address"
        render={({ field }) => (
          <TextField
            required
            type={"text"}
            id="address"
            label="Address"
            variant="outlined"
            placeholder="Enter Your Address"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="PostCode"
        render={({ field }) => (
          <TextField
            required
            type={"number"}
            id="PostCode"
            label="Post Code"
            variant="outlined"
            placeholder="Enter Your PostCode"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const WebsiteForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="Webpage"
        render={({ field }) => (
          <TextField
            type={"text"}
            required
            id="webpage"
            label="Webpage"
            variant="outlined"
            placeholder="Enter Your Webpage"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="homeText"
        render={({ field }) => (
          <TextField
            type={"text"}
            required
            id="homeText"
            label="Home Text"
            variant="outlined"
            placeholder="Enter Your Tome Text"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="AdditionalInformation"
        render={({ field }) => (
          <TextField
            type={"text"}
            id="AdditionalInformation"
            label="AdditionalInformation"
            variant="outlined"
            placeholder="Enter Your question"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="enable_question"
        render={({ field }) => (
          <Checkbox
            color="primary"
            type={"checkbox"}
            id="enable_question"
            label="enable_question"
            variant="outlined"
            placeholder="Enter Your question"
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <ContactForm />;
    case 2:
      return <AboutForm />;
    case 3:
      return <WebsiteForm />;
    default:
      return "unknown step";
  }
}

const AddRestaurentLinearStepper = () => {
  const history = useHistory()
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      Name: "",
      About: "",
      EmailAddress: "",
      PhoneNumber: "",
      Address: "",
      PostCode: "",
      Webpage: "",
      AdditionalInformation: "",
      enable_question: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };
  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };
  const handleNext = (data) => {
    console.log(data);

    if (activeStep == steps.length - 1) {
      setIsLoading(true);

      addRestaurent(data).then((res) => {
        setIsLoading(false);
        console.log(res);
        setActiveStep(activeStep + 1);
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setTimeout(() => {
          history.push("/login");
        }, 5000);
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
  // const handleSkip = () => {
  //   if (!isStepSkipped(activeStep)) {
  //     setSkippedSteps([...skippedSteps, activeStep]);
  //   }
  //   setActiveStep(activeStep + 1);
  // };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
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
        Create Restaurent
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
        <h1 style={{
          textAlign:'center',
          fontWeight:'bold'
        }}>
          <span>Congratulations!</span>  your Restaurent is added succesfully.
        </h1>
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
                  Back to Home
                  <NavLink
                    to={"/login"}
                    style={{
                      color: "#536dfe",
                    }}
                  >
                    {" "}
                    Home
                  </NavLink>
                </div>
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  back
                </Button>
                {/* {isStepOptional(activeStep) && (
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                  >
                    skip
                  </Button>
                )} */}
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

export default AddRestaurentLinearStepper;
