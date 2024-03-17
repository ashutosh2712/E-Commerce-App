import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant";
import usePagination from "../hooks/usePagination";
import ClientSidePaginator from "../components/ClientSidePaginator";

const ProductListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showConfirmation, setShowConfirmation] = useState({
    isloading: false,
  });

  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const { currentPage, getTotalPages, handlePageChange, paginateItems } =
    usePagination(3);

  const currentProducts = paginateItems(products);
  const totalPages = getTotalPages(products);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    setShowConfirmation({
      isloading: true,
    });
    setProductIdToDelete(id);
  };
  const confirmDeleteHandler = () => {
    dispatch(deleteProduct(productIdToDelete));
    setShowConfirmation({
      isloading: false,
    });
    setProductIdToDelete(null);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmation({
      isloading: false,
    });
    setProductIdToDelete(null);
  };
  const createProductHandler = () => {
    dispatch(createProduct());
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
      {loadingDelete && <Loader />}
      {errorDelete && <Message className="errorMessage">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message className="errorMessage">{errorCreate}</Message>}

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

      <ClientSidePaginator
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />

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
