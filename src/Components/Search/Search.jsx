import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import PodcastResults from "./PodcastResults";
import ShowMoreBtn from "../Episodes/ShowMoreBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  clearApiData,
  clearUserLibrary,
  selectPodcastsSeries,
  selectSearchTerm,
  setSearchTerm,
} from "../../redux/podcastSlice";
import { getPodcastData } from "../../apiRequest";

const Search = () => {
  const dispatch = useDispatch();
  const podcast = useSelector(selectPodcastsSeries);
  const searchTerm = useSelector(selectSearchTerm);
  const podcastSeries = useSelector(selectPodcastsSeries);


  useEffect(() => {
    dispatch(clearApiData());
    dispatch(clearUserLibrary())
    if (searchTerm) {
      getPodcastData(searchTerm, 2, 1, "search");
      dispatch(setSearchTerm(""))
    }
  }, []);

  const callback = (sortBy, page, type) => {
    getPodcastData(searchTerm, sortBy, page, type);
  };

  return (
    <>
      <main>
        <SearchBar />
        {podcastSeries && <PodcastResults />}
        {podcast.length && (
          <ShowMoreBtn
            callback={callback}
            totalEpisodesCount={podcast.totalEpisodesCount}
          />
        )}
      </main>
    </>
  );
};

export default Search;
