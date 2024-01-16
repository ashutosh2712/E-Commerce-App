import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = () => {
  const { id } = useParams();
  const productId = id;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch]);

  return (
    <div className="productPageContainer">
      <Link to="/">
        <button className="homeLink">Go back</button>
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
            <li className="listGroupItem">Price: ${product.price}</li>
            <li className="listGroupItem">
              Status:{" "}
              {product.countInStock > 0 ? (
                <span style={{ color: "green" }}>In Stock</span>
              ) : (
                <span style={{ color: "red" }}>Out of Stock</span>
              )}
            </li>
            <li className="listGroupItem">
              <div className="addCartContainer">
                <button
                  className={
                    product.countInStock == 0
                      ? " addCartBtnDisabled"
                      : "addCartBtn"
                  }
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
