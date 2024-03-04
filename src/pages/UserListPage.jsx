import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";

const UserListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const [showConfirmation, setShowConfirmation] = useState({
    isloading: false,
  });

  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set the number of items per page

  // Calculate total number of pages
  const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 0;

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = users
    ? Math.min(startIndex + itemsPerPage, users.length)
    : 0;

  // Slice users array to get items for current page
  const currentUsers = users ? users.slice(startIndex, endIndex) : [];

  // Event handler for changing page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    setShowConfirmation({
      isloading: true,
    });
    setUserIdToDelete(id);
  };
  const confirmDeleteHandler = () => {
    dispatch(deleteUser(userIdToDelete));
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

  return (
    <div className="userListContainer">
      <h1>Users</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button>
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button onClick={() => deleteHandler(user._id)}>
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

export default UserListPage;
