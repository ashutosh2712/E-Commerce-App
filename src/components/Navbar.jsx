import React from "react";

const Navbar = () => {
  return (
    <div className="NavContainer">
      <div className="AppTitle">
        <h2>CLICKSHOP</h2>
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
        <span className="rightItems item-one">
          <i className="fas fa-shopping-cart"></i> Cart
        </span>
        <span className="rightItems item-two">
          <i className="fas fa-user"></i> Sign in
        </span>
      </div>
    </div>
  );
};

export default Navbar;
