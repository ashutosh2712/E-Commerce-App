import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalcode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <div className="formWrapper">
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>
        <form onSubmit={submitHandler} className="registerForm">
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            value={address ? address : ""}
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="city">City</label>
          <input
            required
            type="text"
            value={city ? city : ""}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />

          <label htmlFor="postalCode">Postal Code</label>
          <input
            required
            type="text"
            value={postalcode ? postalcode : ""}
            placeholder="Enter PostalCode"
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <label htmlFor="country">Country</label>
          <input
            required
            type="text"
            value={country ? country : ""}
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit" className="btn-register">
            Continue
          </button>
        </form>
      </div>
    </FormContainer>
  );
};

export default ShippingPage;
