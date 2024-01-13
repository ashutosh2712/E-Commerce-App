import React, { useEffect, useState } from "react";
import products from "../products";
import Product from "../components/Product";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
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
