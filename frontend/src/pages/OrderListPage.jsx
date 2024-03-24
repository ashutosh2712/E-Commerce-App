import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { listOrders } from "../actions/orderAction";
import usePagination from "../hooks/usePagination";
import ClientSidePaginator from "../components/ClientSidePaginator";

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

  const { currentPage, getTotalPages, handlePageChange, paginateItems } =
    usePagination(8);

  const currentOrders = paginateItems(orders);
  const totalPages = getTotalPages(orders);

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
        <table className="htmlTable">
          <thead>
            <tr>
              <th className="htmlTableEle">ID</th>
              <th className="htmlTableEle">USER</th>
              <th className="htmlTableEle">DATE</th>
              <th className="htmlTableEle">TOTAL</th>
              <th className="htmlTableEle">PAID</th>
              <th className="htmlTableEle">DELIVERED</th>
              <th className="htmlTableEle">DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id}>
                <td className="htmltableTd">{order._id}</td>
                <td className="htmltableTd">
                  {order.user && order.user.username}
                </td>
                <td className="htmltableTd">
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className="htmltableTd">${order.totalPrice}</td>
                <td className="htmltableTd">
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>

                <td className="htmltableTd">
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>

                <td className="htmltableTd">
                  <Link to={`/order/${order._id}`}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Link>
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

export default OrderListPage;
