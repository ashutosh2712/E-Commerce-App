import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = () => {
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();

  const { id } = useParams();
  const productId = id;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div className="productPageContainer">
      <Link to="/">
        <button className="homeLink">Go Back</button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="productDetails">
          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="productPageImage"
          />
          <ul className="listGroup">
            <li className="listGroupItem">
              <h3>{product.name}</h3>
            </li>
            <li className="listGroupItem">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </li>
            <li className="listGroupItem">Price :${product.price}</li>
            <li className="listGroupItem">
              Description : {product.description}
            </li>
          </ul>
          <ul className="listGroup">
            <li className="listGroupItem priceItem">
              <p>Price:</p> <p className="priceValue">${product.price}</p>
            </li>
            <li className="listGroupItem statusItem">
              <p>Status:</p>
              <p className="stockStatus">
                {product.countInStock > 0 ? (
                  <span style={{ color: "green" }}>In Stock</span>
                ) : (
                  <span style={{ color: "red" }}>Out of Stock</span>
                )}
              </p>
            </li>

            {product.countInStock > 0 && (
              <li className="listGroupItem selectDropDown">
                <label htmlFor="qtyNumber" className="qtyLabel">
                  Qty:
                </label>
                <select
                  name="qtyNumber"
                  id="qtyNumber"
                  value={qty}
                  className="qtyValue"
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((item) => (
                    <option
                      value={item + 1}
                      key={item + 1}
                      className="qtyOption"
                    >
                      {item + 1}
                    </option>
                  ))}
                </select>
              </li>
            )}
            <li className="listGroupItem">
              <div className="addCartContainer">
                <button
                  className={
                    product.countInStock == 0
                      ? " addCartBtnDisabled"
                      : "addCartBtn"
                  }
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
