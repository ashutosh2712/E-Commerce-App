import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { listOrders } from "../actions/orderAction";

const OrderListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showConfirmation, setShowConfirmation] = useState({
    isloading: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set the number of items per page

  // Calculate total number of pages
  const totalPages = orders ? Math.ceil(orders.length / itemsPerPage) : 0;

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = orders
    ? Math.min(startIndex + itemsPerPage, orders.length)
    : 0;

  // Slice users array to get items for current page
  const currentOrders = orders ? orders.slice(startIndex, endIndex) : [];

  // Event handler for changing page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <div className="userListContainer">
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className="errorMessage">{error}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.username}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <i class="fa-solid fa-circle-info"></i>
                  </Link>
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

export default OrderListPage;
