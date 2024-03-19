import React, { useEffect } from "react";

import Product from "../components/Product";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import ClientSidePaginator from "../components/ClientSidePaginator";
import ProductCarousel from "../components/ProductCarousel";
const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let keyword = location.search;

  // console.log(location.search);

  const { currentPage, getTotalPages, handlePageChange, paginateItems } =
    usePagination(3);

  const currentProducts = paginateItems(products);
  const totalPages = getTotalPages(products);

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="homeContainer">
      <h1>Top Products</h1>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
      ) : (
        <div className="productsList">
          {currentProducts.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
      <ClientSidePaginator
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Home;
