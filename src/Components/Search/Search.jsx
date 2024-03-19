import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import PodcastResults from "./PodcastResults";
import { useDispatch } from "react-redux";
import { clearApiData } from "../../redux/podcastSlice";

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearApiData());
  });
  return (
    <>
      <main>
        <SearchBar />
        <PodcastResults />
      </main>
    </>
  );
};

export default Search;
