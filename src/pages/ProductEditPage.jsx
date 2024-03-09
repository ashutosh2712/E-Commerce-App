import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";
import FormContainer from "../components/FormContainer";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const productId = id;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== Number(productId)) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update Product
  };
  return (
    <FormContainer>
      <Link to="/admin/productlist">
        <button className="homeLink">Go Back</button>
      </Link>
      <div className="formWrapper">
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message className="errorMessage">{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="registerForm">
            <label htmlFor="name">Name</label>
            <input
              className="registerInput"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />

            <label htmlFor="price">price</label>
            <input
              className="registerInput"
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />

            <label htmlFor="image">Image</label>
            <input
              className="registerInput"
              type="text"
              name="image"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image"
            />

            <label htmlFor="brand">Brand</label>
            <input
              className="registerInput"
              type="text"
              name="brand"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter Brand"
            />

            <label htmlFor="countInStock">Stock</label>
            <input
              className="registerInput"
              type="number"
              name="countInStock"
              id="countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              placeholder="Enter CountInStock"
            />

            <label htmlFor="category">Category</label>
            <input
              className="registerInput"
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category"
            />

            <label htmlFor="description">Description</label>
            <input
              className="registerInput"
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />

            <button type="submit" className="btn-register">
              Update
            </button>
          </form>
        )}
      </div>
    </FormContainer>
  );
};

export default ProductEditPage;
