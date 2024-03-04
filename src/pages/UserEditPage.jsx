import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userAction";
import FormContainer from "../components/FormContainer";

const UserEditPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const userId = id;

  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== Number(userId)) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <FormContainer>
      <Link to="/admin/userlist">
        <button className="homeLink">Go back</button>
      </Link>
      <div className="formWrapper">
        <h1>Edit User</h1>
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

            <label htmlFor="email">Email Address</label>
            <input
              className="registerInput"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <div className="isAdminChecked">
              <input
                className="isCheckedInp"
                checked={isAdmin}
                type="checkbox"
                name="isadmin"
                id="isadmin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor="isadmin">Isadmin</label>
            </div>

            <button type="submit" className="btn-register">
              Update
            </button>
          </form>
        )}
      </div>
    </FormContainer>
  );
};

export default UserEditPage;
