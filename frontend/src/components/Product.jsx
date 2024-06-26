import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="productItems">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="productsImage" />
      </Link>

      <div className="productItemsBody">
        <div className="productName">
          <Link to={`/product/${product._id}`}>
            <p>{product.name}</p>
          </Link>
        </div>

        <p className="reviewsNumber">
          {product.rating} from {product.numReviews} reviews
        </p>

        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color={"#f8e825"}
        />
        <h3 className="productPrice">${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
