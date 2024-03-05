import React from "react";
import LibraryResults from "./LibraryResults";
import {
  selectPodcastsSeries,
  selectSearchTerm,
  setPodcastSearchTerm,
} from "../../redux/podcastSlice";
import { getLibrary } from "../../redux/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectLoggedIn } from "../../redux/librarySlice";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  console.log(loggedIn);
  dispatch(getLibrary());
  const podcastSeries = useSelector(selectPodcastsSeries);
  console.log(podcastSeries);
  let librarySeries = podcastSeries.filter((podcast) => {
    return podcast.library === true;
  });

  useEffect(() => {
    if (!loggedIn) {
      console.log(loggedIn);

      navigate("/");
    }
  }, [loggedIn]);

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
          dispatch(setPodcastSearchTerm(e.target.value));
        }}
      />
      <LibraryResults
        librarySeries={searchTerm ? newFiltered : librarySeries}
        onInput={(e) => {
          dispatch(setPodcastSearchTerm(e.target.value));
        }}
      />
    </>
  );
};

export default Library;
