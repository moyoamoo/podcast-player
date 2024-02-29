import React from "react";
import { getPodcastData } from "../apiRequest";
import "./CSS/SearchBar.scss";

const SearchBar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Podcast Series"
        onInput={(e) => {
          getPodcastData(e.target.value, 1);
        }}
      />
    </div>
  );
};

export default SearchBar;
