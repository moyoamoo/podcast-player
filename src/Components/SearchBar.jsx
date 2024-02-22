import React from "react";
import { getPodcastData } from "../apiRequest";

const SearchBar = () => {
  return (
    <div>
      <input placeholder="Search Podcast Series" onInput={(e)=>{getPodcastData(e.target.value)}}/>
    </div>
  );
};

export default SearchBar;
