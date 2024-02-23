import React from "react";
import SearchBar from "./SearchBar";
import PodcastResults from "./PodcastResults";
import Header from "./Header";

const Search = () => {
  return (
    <>
      <main>
        <SearchBar />
        <PodcastResults />
      </main>
      <footer></footer>
    </>
  );
};

export default Search;
