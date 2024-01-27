import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userAction";

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const showDropdown = () => {
    setIsOpen(!isOpen);
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
          <div className="dropdown">
            <button onClick={showDropdown} className="dropbtn rightItems">
              <div className="userDropdownInfo">
                {userInfo.name}&nbsp;&#x2B9F;
              </div>
            </button>
            {isOpen && (
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
      </div>
    </div>
  );
};

export default Navbar;
