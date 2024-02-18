import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";

const CartPage = () => {
  const { id } = useParams();
  const productId = id;
  const navigate = useNavigate();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <div className="cartContainer">
      <div className="cartTitle">
        <h1>Shoping Cart</h1>
      </div>
      <div className="cartItemData">
        {cartItems.length == 0 ? (
          <Message>
            <p className="emptyCartMessage">*Your Cart is empty</p>{" "}
            <Link to="/">
              <button className="homeLinkFromCart">Go Back</button>
            </Link>
          </Message>
        ) : (
          <div className="allCartItemParent">
            <ul className="allCartItems">
              {cartItems.map((item) => (
                <li className="listGroupItem allCartItem" key={item.product}>
                  <img
                    src={`http://localhost:8000${item.image}`}
                    alt={item.name}
                    className="cartItemImage"
                  />
                  <p className="cartProduct">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </p>

                  <p className="cartProductPrice">${item.price}</p>

                  <div className="cartProductQty">
                    <select
                      name="qtyNumber"
                      id="qtyNumber"
                      value={item.qty}
                      className="cartQtyValue"
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((it) => (
                        <option
                          value={it + 1}
                          key={it + 1}
                          className="qtyOption"
                        >
                          {it + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="deleteCartItem"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="listGroup cartSubtotalContainer">
              <li className="listGroupItem subtotalHeader">
                <h3>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h3>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )}
              </li>
              <li className="listGroupItem">
                <button
                  className={
                    cartItems.length === 0
                      ? " addCartBtnDisabled"
                      : "addCartBtn"
                  }
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
