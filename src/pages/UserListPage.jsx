import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";

const UserListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log("delete me.", id);
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
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
                  <Link to={`/admin/user/${user._id}`}>
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
    </div>
  );
};

export default UserListPage;
