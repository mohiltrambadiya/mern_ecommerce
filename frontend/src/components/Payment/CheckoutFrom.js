import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Event, VpnKey } from "@material-ui/icons";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";

const CheckoutFrom = () => {
  const dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const element = useElements();
  const stripe = useStripe();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const { error } = useSelector((state) => state.order);
  const orderData = {
    shipping_info: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.country,
      pincode: shippingInfo.pincode,
      phone_no: shippingInfo.phoneNo,
    },
    order_items: cartItems,
    items_price: orderInfo.subtotal,
    tax_price: orderInfo.tax,
    shipping_price: orderInfo.shippingCharges,
    total_price: orderInfo.totalPrice,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/process/payment`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !element) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            phone: shippingInfo.phoneNo,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        console.log(result.error)
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderData.payment_info = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          orderData && dispatch(createOrder(orderData));
          navigate("/order/success");
        } else {
          alert.error("There's same issue while processing payment.");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => handleSubmit(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default CheckoutFrom;
