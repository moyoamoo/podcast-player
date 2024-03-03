import React from "react";
import LibraryResults from "./LibraryResults";
import { store } from "../../redux/store";
import {
  selectPodcastsSeries,
  setPodcastSearchTerm,
} from "../../redux/podcastSlice";
import { getLibrary } from "../../redux/podcastSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Library = () => {
  store.dispatch(getLibrary());
  const podcastSeries = useSelector(selectPodcastsSeries);
  console.log(podcastSeries);
  let librarySeries = podcastSeries.filter((podcast) => {
    return podcast.library === true;
  });

  return (
    <>
      <div></div>
      <h1>My Library</h1>
      <input type="text" placeholder="Search Library" />
      <LibraryResults
        librarySeries={librarySeries}
        onInput={(e) => {
          store.dispatch(setPodcastSearchTerm(e.target.value));
        }}
      />
    </>
  );
};

export default Library;
