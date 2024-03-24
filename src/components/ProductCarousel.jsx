import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const productTopRated = useSelector((state) => state.productTopRated);

  const { error, loading, products } = productTopRated;

  const plusSlides = (n) => {
    showSlides(currentSlideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    let slideIndex = n;
    if (n > products.length) slideIndex = 1;
    if (n < 1) slideIndex = products.length;
    setCurrentSlideIndex(slideIndex);
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message className="errorMessage">{error}</Message>
  ) : (
    <div>
      <h1 className="carouselHeding">Top Products</h1>
      <div className="slideshow-container">
        {products.map((product, index) => (
          <div
            className={`mySlides fade ${
              index + 1 === currentSlideIndex ? "active" : ""
            }`}
            key={product._id}
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="caroselImg"
              />

              <h4 className="text">
                {product.name}($ {product.price})
              </h4>
            </Link>
          </div>
        ))}

        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>
      <br />

      <div style={{ textAlign: "center" }}>
        {products.map((_, index) => (
          <span
            key={index}
            className={`dot ${index + 1 === currentSlideIndex ? "active" : ""}`}
            onClick={() => currentSlide(index + 1)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
