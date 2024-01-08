import React from "react";
import products from "../products";
import Product from "../components/Product";
const Home = () => {
  return (
    <div className="homeContainer">
      <h1>Latest Products</h1>
      <div className="productsList">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
