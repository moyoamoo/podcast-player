import React from "react";
import { getPodcastData } from "../../apiRequest";
import { useState } from "react";
import "../CSS/SearchBar.scss";
import SearchBtn from "./SearchBtn";
import SearchInput from "./SearchInput";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  return (
    <div className="searchContainer">
      <SearchInput placeholder="Search Podcast Series" func={setSearchTerm}/>
      <SearchBtn searchTerm={searchTerm} />
    </div>
  );
};

export default SearchBar;
