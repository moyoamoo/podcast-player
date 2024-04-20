import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import PodcastResults from "./PodcastResults";
import ShowMoreBtn from "../Episodes/ShowMoreBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  clearApiData,
  selectPodcastsSeries,
  selectSearchTerm,
} from "../../redux/podcastSlice";
import { getPodcastData } from "../../apiRequest";

const Search = () => {
  const dispatch = useDispatch();
  const podcast = useSelector(selectPodcastsSeries);
  const searchTerm = useSelector(selectSearchTerm);

  // useEffect(() => {
  //   dispatch(clearApiData());
  // }, []);

  const callback = (sortBy, page, type) => {
    getPodcastData(searchTerm, sortBy, page, type);
  };

  return (
    <>
      <main>
        <SearchBar />
        <PodcastResults />
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
