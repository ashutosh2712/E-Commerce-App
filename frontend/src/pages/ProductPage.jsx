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
            src={product.image}
            alt={product.name}
            className="productPageImage"
          />

          <ul className="listGroup productPageProductDetails">
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

          <ul className="listGroup productPriceContainer">
            <li className="listGroupItem priceItem">
              <p>Price:</p> <p className="priceValue">${product.price}</p>
            </li>
            <li className="listGroupItem statusItem">
              <p>Status:</p>
              <p className="stockStatus">
                {product.countInStock > 0 ? (
                  <p style={{ color: "green", paddingTop: "0" }}>In Stock</p>
                ) : (
                  <p style={{ color: "red", paddingTop: "0" }}>Out of Stock</p>
                )}
              </p>
            </li>

            {product.countInStock > 0 && (
              <li className="listGroupItem selectDropDown">
                <label htmlFor="qtyNumber" className="qtyLabel">
                  <p>Qty:</p>
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

          <ul className="listGroup reviewContianer">
            <li className="listGroupItem">
              <h2>Reviews</h2>
            </li>
            {product.reviews.length === 0 && (
              <li className="listGroupItem">
                <Message className="successMessage cartEmptyError">
                  No Reviews!
                </Message>
              </li>
            )}
            {product.reviews.map((review) => (
              <li className="listGroupItem" key={review._id}>
                <h3 className="reviewName">{review.name}</h3>
                <Rating value={review.rating} color="#f8e825" />
                <p className="typedReviewDate">
                  {review.createdAt.substring(0, 10)}
                </p>
                <p className="typedReviewDate">{review.comment}</p>
              </li>
            ))}
            <li className="listGroupItem">
              <h3>Write a Review</h3>
              {loadingProductReview && <Loader />}
              {successProductReview && (
                <Message className="successMessage cartEmptyError">
                  Review Added
                </Message>
              )}
              {errorProductReview && (
                <Message className="errorMessage cartEmptyError">
                  {errorProductReview}
                </Message>
              )}
              {userInfo ? (
                <form onSubmit={submitHandler} className="reviewForm">
                  <div className="reviewRating">
                    <label htmlFor="rating">Rating</label>
                    <select
                      name="rating"
                      id="rating"
                      value={rating}
                      className="qtyValue"
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Average</option>
                      <option value="3">3 - Good</option>
                      <option value="4">2 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>

                  <textarea
                    name="rating"
                    id="rating"
                    rows="10"
                    className="reviewTextarea"
                    value={comment}
                    placeholder="Your Review.."
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button
                    disabled={loadingProductReview}
                    type="submit"
                    className="btn-register"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <Message className="successMessage cartEmptyError">
                  <p>
                    {" "}
                    Please <Link to="/login">Login</Link> to write a review{" "}
                  </p>
                </Message>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
