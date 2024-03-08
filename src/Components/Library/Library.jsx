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
import { getLibraryData } from "../../apiRequest";
import "../CSS/libraryPodcasts.scss";

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
      dispatch(clearApiData())
      if (libraryPodcastsUuid.length > 0) {
        libraryPodcastsUuid.forEach((uuid) => {
           getLibraryData(uuid, 1);
        });
      }
    }
  }, [loggedIn, libraryPodcastsUuid]);

  libraryPodcasts = podcasts.filter((podcast) => {
    if (podcast.library) {
      return true;
    }
  });

  let newFiltered;
  if (searchTerm) {
    newFiltered = libraryPodcasts.filter((podcast) => {
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
      <div>
        <label htmlFor="sortLibrary">Sort Library</label>
        <select
          name="sortLibrary"
          onChange={(e) => {
            dispatch(sortPodcasts(e.target.value));
          }}
        >
          <option>---Sort By---</option>
          <option value="sortAsc">A-Z</option>
          <option value="sortDesc">Z-A</option>
        </select>
      </div>
      {libraryPodcasts.length > 0 ? (
        <LibraryResults
          libraryPodcasts={searchTerm ? newFiltered : libraryPodcasts}
        />
      ) : (
        <div class="validation">
          <p>No Podcasts Found</p>
        </div>
      )}
    </>
  );
};

export default Library;
