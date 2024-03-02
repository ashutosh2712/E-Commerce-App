import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userAction";

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdownUser")) {
        setIsOpenUser(false);
      }
      if (!e.target.closest(".dropdownAdmin")) {
        setIsOpenAdmin(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const showUserDropdown = () => {
    setIsOpenUser(!isOpenUser);
    console.log("user");
  };

  const showAdminDropdown = () => {
    setIsOpenAdmin(!isOpenAdmin);
    console.log("admin");
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="NavContainer">
      <div className="AppTitle">
        <Link to="/" className="navbarEndItems">
          <h2>CLICKSHOP</h2>
        </Link>
      </div>

      <div className="NavSearch">
        <input
          className="NavSearchInput"
          type="text"
          name="search"
          id="search"
          placeholder="Search Products.."
        />
        <button type="submit" className="SearchButton">
          Search
        </button>
      </div>

      <div className="rightWrapper">
        <Link to="cart/" className="navbarEndItems">
          <span className="rightItems item-one">
            <i className="fas fa-shopping-cart"></i> Cart
          </span>
        </Link>

        {userInfo ? (
          <div className="dropdownUser">
            <button onClick={showUserDropdown} className="dropbtn rightItems">
              <div className="userDropdownInfo">
                {userInfo.name}&nbsp;&#x2B9F;
              </div>
            </button>
            {isOpenUser && (
              <div id="myDropdown" className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <p onClick={logoutHandler}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <Link to="login/" className="navbarEndItems">
            <span className="rightItems item-two">
              <i className="fas fa-user"></i> Login
            </span>
          </Link>
        )}

        {userInfo && userInfo.isAdmin && (
          <div className="dropdownAdmin">
            <button onClick={showAdminDropdown} className="dropbtn rightItems">
              <div className="userDropdownInfo">Admin&nbsp;&#x2B9F;</div>
            </button>
            {isOpenAdmin && (
              <div id="myUsers" className="dropdown-content">
                <Link to="/admin/userlist">Users</Link>
                <Link to="/admin/productlist">Products</Link>
                <Link to="/admin/orderlist">Orders</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
