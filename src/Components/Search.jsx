import React from "react";
import SearchBar from "./SearchBar";
import PodcastResults from "./PodcastResults";

const Search = () => {
  return (
    <>
      <header></header>
      <main>
        <SearchBar />
        <PodcastResults />
      </main>
      <footer></footer>
    </>
  );
};

export default Search;
