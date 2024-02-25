import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderPage = () => {
  const { id } = useParams();
  const orderId = id;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message className="errorMessage">{error}</Message>
  ) : (
    <div className="placeorderContainer">
      <h1 className="orderHeader">Order: {order._id}</h1>
      <div className="containerItems">
        <ul className="listGroup shippingSummary">
          <li className="listGroupItem">
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Shipping:</strong>
              {order.shippingAddress.address},{order.shippingAddress.city},
              {order.shippingAddress.postalcode},{order.shippingAddress.country}
            </p>

            {order.isDelivered ? (
              <Message className="successMessage">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message className="warningMessage">Not Delivered</Message>
            )}
          </li>

          <li className="listGroupItem">
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong>
              {order.paymentMethod}
            </p>

            {order.isPaid ? (
              <Message className="successMessage">
                Paid on {order.paidAt}
              </Message>
            ) : (
              <Message className="warningMessage">Not Paid</Message>
            )}
          </li>

          <li className="listGroupItem">
            <h2 style={{ marginBottom: "1rem" }}>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message className="errorMessage">Order is empty</Message>
            ) : (
              <ul className="listGroup shippingSummary">
                {order.orderItems.map((item, index) => (
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
            <p className="orderItemSum">${order.itemsPrice}</p>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Shipping:</p>
            <p className="orderItemSum">${order.shippingPrice}</p>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Tax:</p>
            <p className="orderItemSum">${order.taxPrice}</p>
          </li>
          <li className="listGroupItem placeOrderFinal">
            <p className="orderItemSum">Total:</p>
            <p className="orderItemSum">${order.totalPrice}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
