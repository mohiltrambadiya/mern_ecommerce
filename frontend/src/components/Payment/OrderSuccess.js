import React, { Fragment } from "react";
import { CheckCircle } from "@material-ui/icons";
import "./orderSuccess.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title="Order Success" />
      <div className="orderSuccess">
        <CheckCircle />

        <Typography>Your order has been placed succesfully.</Typography>
        <Link to="/view/orders">View Orders</Link>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
