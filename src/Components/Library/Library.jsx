import React from "react";
import LibraryResults from "./LibraryResults";
import {
  clearApiData,
  selectLibrary,
  selectPodcastsSeries,
  selectSearchTerm,
  setPodcastSearchTerm,
  sortPodcasts,
} from "../../redux/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectLoggedIn } from "../../redux/librarySlice";
import { useNavigate } from "react-router-dom";
import { getPodcastByUuid } from "../../apiRequest";
import "../CSS/libraryPodcasts.scss";
import LibrarySortBySelect from "./LibrarySortBySelect";

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
      dispatch(clearApiData());
      if (libraryPodcastsUuid.length > 0) {
        libraryPodcastsUuid.forEach((uuid) => {
          getPodcastByUuid(uuid, 2, 1, "append");
        });
      }
    }
  }, [loggedIn, libraryPodcastsUuid]);

  let newFiltered;
  if (searchTerm) {
    newFiltered = podcasts.filter((podcast) => {
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
      <LibrarySortBySelect />
      {podcasts.length > 0 ? (
        <LibraryResults libraryPodcasts={searchTerm ? newFiltered : podcasts} />
      ) : (
        <div className="validation">
          <p>No Podcast Found</p>
        </div>
      )}
    </>
  );
};

export default Library;
