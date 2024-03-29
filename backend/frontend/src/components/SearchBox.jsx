import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(currentPath);
    }
  };

  const changeHandler = (val) => {
    if (val) {
      navigate(`/?keyword=${val}`);
    } else {
      navigate(currentPath);
    }
  };
  return (
    <form onSubmit={submitHandler} className="NavSearch">
      <input
        className="NavSearchInput"
        type="text"
        name="search"
        id="search"
        onChange={(e) => {
          setKeyword(e.target.value);
          changeHandler(e.target.value);
        }}
        placeholder="Search Products.."
      />
      <button type="submit" className="SearchButton">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
