import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./UpdateOrder.css";
import {useNavigate, useParams, Link} from 'react-router-dom'
import { clearErrors, getOrderDetail, updateOrder } from "../../actions/orderAction";

const UpdateOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderdetail);
  const { error: updateError, success } = useSelector((state) => state.orderaction);
  const {orderId} = useParams()
  const navigate = useNavigate()

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(myForm, orderId));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
      navigate('/admin/orders')
    }
    if (order && order._id !== orderId) {
      dispatch(getOrderDetail(orderId));
    }

  }, [dispatch, alert, error, orderId, success, updateError, navigate]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.order_status === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.order_items &&
                      order.order_items.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.order_status === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Status</option>
                      {order.order_status === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.order_status === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrder;