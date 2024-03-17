import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationPopup from "../components/ConfirmationPopup";
import ClientSidePaginator from "../components/ClientSidePaginator";
import usePagination from "../hooks/usePagination";

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

  const { currentPage, getTotalPages, handlePageChange, paginateItems } =
    usePagination(4);

  const currentUsers = paginateItems(users);
  const totalPages = getTotalPages(users);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, successDelete, userInfo]);

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

export default UserListPage;
