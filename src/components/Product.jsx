import React from "react";

const Product = ({ product }) => {
  return (
    <div className="productItems">
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt="" className="productsImage" />
      </a>
      <div className="productItemsBody">
        <div className="productName">
          <a href={`/product/${product._id}`}>
            <p>{product.name}</p>
          </a>
        </div>
        <div className="productRating">
          {product.rating} from {product.numReviews} reviews
        </div>
        <h3 className="productPrice">${product.price}</h3>
      </div>
    </div>
  );
};

export default Product;
