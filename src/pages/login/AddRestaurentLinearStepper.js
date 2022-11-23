import {
  Button, Checkbox, Step,
  StepLabel, Stepper, TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  Controller,
  FormProvider, useForm, useFormContext
} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { addRestaurent } from "../../Apis/Restaurent";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Business Information",
    "Contact Information",
    "Website Information",
  ];
}
// STEPS FORM 
const BasicForm = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="Name"
        rules={{
          required: "* Business Name is required"
        }}
        render={({ field }) => (
          <TextField
            type={"text"}
            id="name"
            label="Business Name *"
            variant="outlined"
            placeholder="Enter Your Business Name"
            fullWidth
            margin="normal"
            {...field}
            error={errors.Name}
            helperText={errors?.Name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="About"
        render={({ field }) => (
          <>
            {console.log(errors)}
            <TextField
              type={"text"}
              id="about"
              label="Business About"
              variant="outlined"
              placeholder="Enter Your Business About"
              fullWidth
              margin="normal"
              {...field}
            />
          </>
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
        name="Address"
        rules={{
          required: '* Adress is required'
        }}
        render={({ field }) => (
          <TextField
            type={"text"}
            id="address"
            label="Address *"
            variant="outlined"
            placeholder="Enter Your Address"
            fullWidth
            margin="normal"
            {...field}
            error={errors?.Address}
            helperText={errors?.Address?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="PostCode"
        rules={{
          required: "* Postcode is required"
        }}
        render={({ field }) => (
          <TextField
            type={"text"}
            id="PostCode"
            label="Post Code *"
            variant="outlined"
            placeholder="Enter Your PostCode"
            fullWidth
            margin="normal"
            {...field}
            error={errors?.PostCode}
            helperText={errors?.PostCode?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="PhoneNumber"
        rules={{
          required: false,
          minLength: 11,
          maxLength: 11
        }}
        render={({ field, formState: { errors } }) => (
          <>
            {console.log(errors)}
            <TextField
              type={"number"}
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your 11 Digit Phone Number"
              fullWidth
              margin="normal"
              error={errors?.PhoneNumber}
              helperText={
                (errors?.PhoneNumber?.type === 'maxLength' && '* Phone number mustbe have 11 digit (required)') ||
                (errors?.PhoneNumber?.type === 'minLength' && '* Phone number mustbe have 11 digit (required)')
              }
              {...field}
            />
          </>

        )}
      />
    </>
  );
};
const WebsiteForm = () => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="EmailAddress"
        render={({ field }) => (
          <TextField
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
        name="Webpage"
        render={({ field }) => (
          <TextField
            type={"text"}
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
      <div>
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
              {...field}
            />
          )}
        />
        <lable htmlFor='enable_question'>Enable Question</lable>
      </div>

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
      enable_question: false,
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
    if (activeStep === steps.length - 1) {
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth:'400px'
      }}>
      <h1
        style={{
          textAlign: "center",
          color: "#0575B4",
          marginBottom: "20px",
          fontWeight: "bold",
        }}>
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
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '15px'
        }}>
          <span style={{
            fontSize: '25px'
          }}>Congratulations!</span> <br />
          your Restaurent is added succesfully.
        </h1>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <div
                style={{
                  marginTop: "20px",
                }} >
                <Button
                  className={classes.button}
                  disabled={activeStep === 0}
                  onClick={handleBack} >
                  back
                </Button>
                <Button
                  disabled={isLoading ? true : false}
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  type="submit" >
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

export default AddRestaurentLinearStepper;
