import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";

const ProductListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showConfirmation, setShowConfirmation] = useState({
    isloading: false,
  });

  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Set the number of items per page

  // Calculate total number of pages
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = products
    ? Math.min(startIndex + itemsPerPage, products.length)
    : 0;

  // Slice users array to get items for current page
  const currentProducts = products ? products.slice(startIndex, endIndex) : [];

  // Event handler for changing page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  const deleteHandler = (id) => {
    setShowConfirmation({
      isloading: true,
    });
    setUserIdToDelete(id);
  };
  const confirmDeleteHandler = () => {
    //delete product
    setShowConfirmation({
      isloading: false,
    });
    setUserIdToDelete(null);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmation({
      isloading: false,
    });
    setUserIdToDelete(null);
  };
  const createProductHandler = (product) => {
    console.log("Create Product");
  };
  return (
    <div className="userListContainer">
      <div className="productListWrapper">
        <div className="productListInfo">
          <h1>Products</h1>
        </div>

        <button className="btn-createProduct" onClick={createProductHandler}>
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button>
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button onClick={() => deleteHandler(product._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          className="btn-register"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            className="paginationBtn"
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button
          className="btn-register"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showConfirmation.isloading && (
        <ConfirmationPopup
          onConfirm={confirmDeleteHandler}
          onCancel={cancelDeleteHandler}
        />
      )}
    </div>
  );
};

export default ProductListPage;
