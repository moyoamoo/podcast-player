import React from "react";
import { getPodcastData } from "../../apiRequest";
import { useState } from "react";
import {
  selectSearchTerm,
  setPodcastSearchTerm,
} from "../../redux/podcastSlice";
import "../CSS/SearchBar.scss";
import SearchBtn from "./SearchBtn";
import SearchInput from "./SearchInput";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const searchTerm = useSelector(selectSearchTerm);
  return (
    <div className="searchContainer">
      <SearchInput
        placeholder="Search Podcast Series"
        func={setPodcastSearchTerm}
      />
      <SearchBtn searchTerm={searchTerm} />
    </div>
  );
};

export default SearchBar;
