import React from "react";
import products from "../products";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

const ProductPage = () => {
  const { id } = useParams();
  const productId = id;
  const product = products.find((p) => p._id === productId);
  return (
    <div className="productPageContainer">
      <Link to="/">
        <button className="homeLink">Go back</button>
      </Link>
      <div className="productDetails">
        <img
          src={product.image}
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
          <li className="listGroupItem">Description : {product.description}</li>
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
    </div>
  );
};

export default ProductPage;
