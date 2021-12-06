import React, { Fragment } from "react";
import CheckoutForm from './CheckoutFrom'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const Payment = ({stripeApiKey}) => {

  return (
    <Fragment>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <CheckoutForm/>
      </Elements>
    </Fragment>
  );
};

export default Payment;
