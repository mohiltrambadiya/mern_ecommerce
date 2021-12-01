import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Webfont from "webfontloader";
import React from "react";
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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product/:id" element={<ProductDetail />}></Route>
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
