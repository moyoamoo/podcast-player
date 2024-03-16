import React from "react";
import { getPodcastData } from "../../apiRequest";
import { useState } from "react";
import "../CSS/SearchBar.scss";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  console.log(searchTerm);
  return (
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Search Podcast Series"
        onInput={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button
        className="searchBtn"
        onClick={() => {
          getPodcastData(searchTerm, 1);
        }}
      >
        Search Podcast
      </button>
    </div>
  );
};

export default SearchBar;
