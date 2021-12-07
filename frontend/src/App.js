import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Webfont from "webfontloader";
import React, { useState } from "react";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetail from "./components/Product/ProductDetail.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignup from "./components/User/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import ChangePassword from "./components/User/ChangePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Payment/Payment.js";
import OrderSuccess from "./components/Payment/OrderSuccess.js";
import MyOrder from "./components/Order/MyOrder.js";
import OrderDetail from './components/Order/OrderDetail.js'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(`/api/v1/stripeapikey`);
    data && data.stripeApiKey && setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/products/:id" element={<ProductDetail />}></Route>
        <Route exact path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/login" element={<LoginSignup />}></Route>
        <Route exact path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />}></Route>
        </Route>
        <Route exact path="/profile/update" element={<ProtectedRoute />}>
          <Route
            exact
            path="/profile/update"
            element={<UpdateProfile />}
          ></Route>
        </Route>
        <Route exact path="/password/update" element={<ProtectedRoute />}>
          <Route
            exact
            path="/password/update"
            element={<ChangePassword />}
          ></Route>
        </Route>
        <Route
          exact
          path="/password/forgot"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/shipping" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />}></Route>
        </Route>
        <Route exact path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />}></Route>
        </Route>
        <Route exact path="/process/payment" element={<ProtectedRoute />}>
          <Route
            exact
            path="/process/payment"
            element={<Payment stripeApiKey={stripeApiKey} />}
          ></Route>
        </Route>
        <Route exact path="/order/success" element={<ProtectedRoute />}>
          <Route exact path="/order/success" element={<OrderSuccess />}></Route>
        </Route>
        <Route exact path="/view/orders" element={<ProtectedRoute />}>
          <Route exact path="/view/orders" element={<MyOrder />}></Route>
        </Route>
        <Route exact path="/order/:id" element={<ProtectedRoute />}>
          <Route exact path="/order/:id" element={<OrderDetail />}></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
