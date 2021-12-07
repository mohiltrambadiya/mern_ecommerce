import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

//create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/create", order, config);
    dispatch({
      type: ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      error: error.responce.data.message,
    });
  }
};

//get my order
export const getMyOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_ORDER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.responce.data.message,
    });
  }
};

//get order detail
export const getOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      error: error.responce.data.messaage,
    });
  }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
