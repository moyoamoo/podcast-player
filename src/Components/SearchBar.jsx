import React from "react";
import { getPodcastData } from "../apiRequest";
import { useState } from "react";
import "./CSS/SearchBar.scss";

const SearchBar = () => {

const [searchTerm, setSearchTerm] = useState();

  return (
    <div>
      <input
        type="text"
        placeholder="Search Podcast Series"
        onInput={(e) => {
         setSearchTerm(e.target.value)
        }}
      />
      <button  onClick={()=>{
        getPodcastData(searchTerm)
      }}>Search Podcast</button>
    </div>
  );
};

export default SearchBar;
