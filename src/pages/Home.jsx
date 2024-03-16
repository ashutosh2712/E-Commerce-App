import React, { useEffect } from "react";

import Product from "../components/Product";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let keyword = location.search;

  // console.log(location.search);
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="homeContainer">
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
      ) : (
        <div className="productsList">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
