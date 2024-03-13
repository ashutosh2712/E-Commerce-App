import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  const productId = id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <div className="productPageContainer">
      <Link to="/">
        <button className="homeLink">Go Back</button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
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
          <div className="reviewContainer">
            <ul className="listGroup">
              <li className="listGroupItem">
                <h2>Reviews</h2>
              </li>
              {product.reviews.length === 0 && (
                <li className="listGroupItem">
                  <Message className="successMessage">No Reviews!</Message>
                </li>
              )}
              {product.reviews.map((review) => (
                <li className="listGroupItem" key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} color="#f8e825" />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li className="listGroupItem">
                <h4>Write a Review</h4>
                {loadingProductReview && <Loader />}
                {successProductReview && (
                  <Message className="successMessage">Review Added</Message>
                )}
                {errorProductReview && (
                  <Message className="errorMessage">
                    {errorProductReview}
                  </Message>
                )}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <label htmlFor="rating">Rating</label>
                    <select
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">select</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Average</option>
                      <option value="3">3 - Good</option>
                      <option value="4">2 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                    <label htmlFor="review">Review</label>
                    <textarea
                      name="rating"
                      id="rating"
                      rows="10"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button disabled={loadingProductReview} type="submit">
                      Submit
                    </button>
                  </form>
                ) : (
                  <Message className="successMessage">
                    <p>
                      {" "}
                      Please <Link to="/login">Login</Link> to write a review{" "}
                    </p>
                  </Message>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
