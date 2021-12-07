import React, { Fragment, useEffect } from "react";
import "./OrderDetail.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetail, clearErrors } from "../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { loading, order, error } = useSelector((state) => state.orderdetail);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetail(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user_id && order.user_id.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shipping_info && order.shipping_info.phone_no}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shipping_info &&
                      `${order.shipping_info.address}, ${order.shipping_info.city}, ${order.shipping_info.state}, ${order.shipping_info.pincode}, ${order.shipping_info.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.payment_info &&
                      order.payment_info.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.payment_info &&
                    order.payment_info.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.total_price && order.total_price}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.order_status && order.order_status === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.order_status && order.order_status}
                  </p>
                </div>
              </div>
              <div className="orderDetailsCartItems">
                <Typography>Order Items</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.order_items &&
                    order.order_items.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                        <span>
                          {item.price} X {item.quantity} {" = "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetail;
