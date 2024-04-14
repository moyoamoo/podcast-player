import React, { useCallback, useState } from "react";
import LibraryResults from "./LibraryResults";
import LibrarySortBySelect from "./LibrarySortBySelect";
import axios from "axios";
import {
  clearApiData,
  selectPodcastsSeries,
  selectSearchTerm,
  setPodcastSearchTerm,
  selectLibrary,
  addToLibrary,
} from "../../redux/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setWindow, setMessage } from "../../redux/librarySlice";
import { useNavigate } from "react-router-dom";
import { getPodcastByUuid } from "../../apiRequest";

import "../CSS/libraryPodcasts.scss";

const Library = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const searchTerm = useSelector(selectSearchTerm);
  const libraryUuids = useSelector(selectLibrary);
  const [isLibrary, setIsLibrary] = useState(false);
  let podcasts = useSelector(selectPodcastsSeries);

  //gets uuids from database
  const getLibraryUuids = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:6001/library/get", {
        headers: {
          token: token,
        },
      });

      console.log(data.Library);

      if (data.status && data.library) {
        data.library.forEach((uuid) => {
          dispatch(addToLibrary(uuid));
          setIsLibrary(true);
        });
      }
    } catch (e) {
      console.log(e);
      dispatch(setMessage("Podcasts Unavailable"));
      setIsLibrary(false);
    }
  }, []);

  //get podcasts using uuids
  const getLibrary = useCallback(async () => {
    libraryUuids.forEach((uuid) => {
      getPodcastByUuid(uuid, 2, 1, "append");
    });
  }, [isLibrary]);

  useEffect(() => {
    if (!token) {
      dispatch(setWindow(0));
      return;
    } else {
      dispatch(clearApiData());
      getLibraryUuids();
    }
  }, [getLibraryUuids, token, libraryUuids]);

  useEffect(() => {
    if (isLibrary) {
      getLibrary();
    }
  }, [isLibrary]);

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
      <div className="libraryContainer">
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
          <LibraryResults
            libraryPodcasts={searchTerm ? newFiltered : podcasts}
          />
        ) : (
          <div className="validation">
            <p>No Podcast Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Library;
