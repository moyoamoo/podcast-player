import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/librarySlice";
import {
  selectRankedGenres,
  selectRankedPodcasts,
  selectPreviousSearches,
} from "../../redux/statsSlice";
import TopGenres from "./TopGenres";
import "../CSS/stats.scss";
import TopPodcasts from "./TopPodcasts";
import PreviousSearches from "./PreviousSearches";
import { clearApiData } from "../../redux/podcastSlice";
import { getTopPodcasts } from "../../apiRequests/Discover/getTopPodcasts";
import { getRecentSearches } from "../../apiRequests/Discover/getRecentSearches";
import { getTopGenres } from "../../apiRequests/Discover/getTopGenres";

const Discover = () => {
  const dispatch = useDispatch();
  const rankedGenres = useSelector(selectRankedGenres);
  const rankedPodcasts = useSelector(selectRankedPodcasts);
  const previousSearches = useSelector(selectPreviousSearches);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(clearApiData());
    if (token) {
      getTopGenres();
      getTopPodcasts();
      getRecentSearches();
    }
  }, []);

  return (
    <main>
      <div className="discoverHeader">
        <h2>Discover</h2>
      </div>
      {token && Object.values(rankedPodcasts).length && <TopPodcasts />}
      {token && Object.values(rankedGenres).length && <TopGenres />}
      {token && previousSearches.length && <PreviousSearches />}
    </main>
  );
};

export default Discover;
