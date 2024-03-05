import React from "react";
import LibraryResults from "./LibraryResults";
import { store } from "../../redux/store";
import {
  selectPodcastsSeries,
  selectSearchTerm,
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

  let newFiltered;
  const searchTerm = useSelector(selectSearchTerm);
  if (searchTerm) {
    newFiltered = librarySeries.filter((podcast) => {
      if (podcast.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
    });
  }

  return (
    <>
      <div></div>
      <h1>My Library</h1>
      <input
        type="text"
        placeholder="Search Library"
        onInput={(e) => {
          store.dispatch(setPodcastSearchTerm(e.target.value));
        }}
      />
      <LibraryResults
        librarySeries={searchTerm ? newFiltered : librarySeries}
        onInput={(e) => {
          store.dispatch(setPodcastSearchTerm(e.target.value));
        }}
      />
    </>
  );
};

export default Library;
