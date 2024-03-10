import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";
import axios from "axios";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();
  const productId = id;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
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
    }
  }, [dispatch, product, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update Product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/products/upload`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <Link to="/admin/productlist">
        <button className="homeLink">Go Back</button>
      </Link>
      <div className="formWrapper">
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <Message className="errorMessage">{errorUpdate}</Message>
        )}
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

            <label htmlFor="image-file">Choose File</label>
            <input
              className="registerInput"
              type="file"
              name="image-file"
              id="image-file"
              onChange={uploadFileHandler}
            />

            {uploading && <Loader />}

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
            <textarea
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
