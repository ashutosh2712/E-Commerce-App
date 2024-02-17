import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import Message from "./Message";
import { Link } from "react-router-dom";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrder = () => {
    console.log("placeOrder");
  };
  return (
    <div className="placeorderContainer">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="containerItems">
        <ul className="listGroup shippingSummary">
          <li className="listGroupItem">
            <h2>Shipping</h2>
            <p>
              <strong>Shipping:</strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.postalcode},{cart.shippingAddress.country}
            </p>
          </li>

          <li className="listGroupItem">
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </p>
          </li>

          <li className="listGroupItem">
            <h2 style={{ marginBottom: "1rem" }}>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul className="listGroup shippingSummary">
                {cart.cartItems.map((item, index) => (
                  <li className="listGroupItem orderProductDetails" key={index}>
                    <img
                      src={`http://localhost:8000${item.image}`}
                      alt={item.name}
                      className="placeOrderImage"
                    />

                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p className="orderItemSum">
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        <ul className="listGroup shippingSummary">
          <li className="listGroupItem">
            <h2>Order Summary</h2>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Items:</p>
            <p className="orderItemSum">${cart.itemsPrice}</p>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Shipping:</p>
            <p className="orderItemSum">${cart.shippingPrice}</p>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Tax:</p>
            <p className="orderItemSum">${cart.taxPrice}</p>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Total:</p>
            <p className="orderItemSum">${cart.totalPrice}</p>
          </li>

          <div className="listGroupItem">
            <button
              type="submit"
              className={
                cart.cartItems === 0 ? " addCartBtnDisabled" : "btn-register"
              }
              onClick={placeOrder}
              style={{ marginTop: 0 }}
            >
              Place Order
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
