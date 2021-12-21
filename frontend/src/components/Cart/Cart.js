import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartAction";
import CartItemCard from "./CartItemCard.js";
import { Link, useNavigate } from "react-router-dom";
import { RemoveShoppingCart } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const decreaseQuantity = (id, qty) => {
    qty -= 1;
    if (qty > 0) {
      dispatch(addItemToCart(id, qty));
    }
    return;
  };
  const increaseQuantity = (id, qty, stock) => {
    qty += 1;
    if (qty <= stock) {
      dispatch(addItemToCart(id, qty));
    }
    return;
  };
  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkOutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  return (
    <Fragment>
      <MetaData title='Cart'/>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCart />
          <Typography>No product in your cart</Typography>
          <Link to={`/products`}>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
