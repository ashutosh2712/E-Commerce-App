import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <span className="rightItems item-two">
          <i className="fas fa-user"></i> Sign in
        </span>
      </div>
    </div>
  );
};

export default Navbar;
