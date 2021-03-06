import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  productAdminActionReducer,
  productDetailReducer,
  productReducer,
  submitReviewReducer,
} from "./reducers/productReducer";
import {
  profielReducer,
  userReducer,
  forgotPasswordReducer,
  getAllUserReducer,
  userDetailReducer,
  userActionReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { getAllOrderReducer, myOrderReducer, orderActionReducer, orderDetailReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profielReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order: orderReducer,
  myorder: myOrderReducer,
  orderdetail: orderDetailReducer,
  submitreview: submitReviewReducer,
  newproduct: newProductReducer,
  productaction: productAdminActionReducer,
  allorder: getAllOrderReducer,
  orderaction: orderActionReducer,
  alluser: getAllUserReducer,
  userdetail: userDetailReducer,
  useraction: userActionReducer
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
