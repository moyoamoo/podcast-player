import React from "react";
import LibraryResults from "./LibraryResults";
import {
  selectLibrary,
  selectPodcastsSeries,
  selectSearchTerm,
  setPodcastSearchTerm,
} from "../../redux/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectLoggedIn } from "../../redux/librarySlice";
import { useNavigate } from "react-router-dom";
import { getLibraryData } from "../../apiRequest";

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLoggedIn);
  const searchTerm = useSelector(selectSearchTerm);
  const libraryPodcastsUuid = useSelector(selectLibrary);
  let podcasts = useSelector(selectPodcastsSeries);
  let libraryPodcasts;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    } else {
      if (libraryPodcastsUuid.length > 0) {
        libraryPodcastsUuid.map((uuid) => {
          return getLibraryData(uuid, 1);
        });
      }
    }
  }, [loggedIn]);

  libraryPodcasts = podcasts.filter((podcast) => {
    if (podcast.library) {
      return true;
    }
  });

  let newFiltered;
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
      {libraryPodcasts.length > 0 ? (
        <LibraryResults
          libraryPodcasts={searchTerm ? newFiltered : librarySeries}
        />
      ) : (
        <p>No podcasts in Library</p>
      )}
    </>
  );
};

export default Library;
