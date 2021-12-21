import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import {
  AccountBalance,
  LibraryAddCheck,
  LocalShipping,
} from "@material-ui/icons";
import React, { Fragment } from "react";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Detail</Typography>,
      icon: <LocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps &&
          steps.map((step, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel style={{color: activeStep >= index ? 'tomato' : 'rgba(0,0,0,0.649)'}} icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
