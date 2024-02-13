import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";

const PaymentPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="paymentContainer">
      <CheckoutSteps step1 step2 step3 />
      <form onSubmit={submitHandler}>
        <label className="selectLabel">Select Method</label>
        <div className="paymentChoose">
          <input
            type="radio"
            name="paymentMethod"
            id="paypal"
            value="PayPal or Credit Card"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal or Credit Card</label>
        </div>
        <button type="submit" className="btn-register">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
