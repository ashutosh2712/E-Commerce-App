import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";
import { listMyOrders } from "../actions/orderAction";

const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set the number of items per page

  // Calculate total number of pages
  const totalPages = orders ? Math.ceil(orders.length / itemsPerPage) : 0;

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = orders
    ? Math.min(startIndex + itemsPerPage, orders.length)
    : 0;

  // Slice orders array to get items for current page
  const currentOrders = orders ? orders.slice(startIndex, endIndex) : [];

  // Event handler for changing page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("*Password Do not match!Try again");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <div className="userProfileContianer">
      <div className="userProfileInfo">
        <h2>User Profile</h2>
        {message && <Message className="successMessage">{message}</Message>}
        {error && <Message className="errorMessage">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className="registerForm">
          <div className="registerInputField">
            <label htmlFor="name">Name</label>
            <input
              className="registerInput"
              type="text"
              name="name"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your name"
            />
          </div>

          <div className="registerInputField">
            <label htmlFor="email">Email Address</label>
            <input
              className="registerInput"
              type="email"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </div>

          <div className="registerInputField">
            <label htmlFor="password">Password</label>
            <input
              className="registerInput"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
          </div>

          <div className="registerInputField">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              className="registerInput"
              type="password"
              name="ConfirmPassword"
              id="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" className="btn-register">
            Update
          </button>
        </form>
      </div>

      <div className="userOrderInfo">
        <h2>My orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message className="errorMessage">{errorOrders}</Message>
        ) : (
          <>
            <table className="htmlTable">
              <thead>
                <tr>
                  <th className="htmlTableEle">ID</th>
                  <th className="htmlTableEle">DATE</th>
                  <th className="htmlTableEle">TOTAL</th>
                  <th className="htmlTableEle">PAID</th>
                  <th className="htmlTableEle">DELIVERED</th>
                  <th className="htmlTableEle"></th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="htmltableTd">{order._id}</td>
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
                      <Link to={`/order/${order._id}`}>
                        <button className="btn-register btn-dtl">
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="btn-register"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    className="paginationBtn"
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                className="btn-register"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
