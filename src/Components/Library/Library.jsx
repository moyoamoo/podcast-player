import React, { useCallback, useState } from "react";
import LibraryResults from "./LibraryResults";
import LibrarySortBySelect from "./LibrarySortBySelect";
import axios from "axios";
import {
  clearApiData,
  selectPodcastsSeries,
  selectLibrary,
  addToLibrary,
} from "../../redux/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setWindow,
  setMessage,
  selectSearchTerm,
  setSearchTerm,
  selectToken
} from "../../redux/librarySlice";
import { getPodcastByUuid } from "../../apiRequest";

import "../CSS/libraryPodcasts.scss";

const Library = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  let podcasts = useSelector(selectPodcastsSeries);
  const searchTerm = useSelector(selectSearchTerm);

  console.log(podcasts.length);

  //gets uuids from database
  const getLibraryUuids = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:6001/library/get", {
        headers: {
          token: token,
        },
      });

      if (data.status) {
        data.data.forEach((uuid) => {
          getPodcastByUuid(uuid, 2, 1, "library");
        });
      }
    } catch (e) {
      dispatch(setMessage("Podcasts Unavailable"));
      console.log(e);
    }
  }, []);

  //get podcasts using uuids

  useEffect(() => {
    if (!token) {
      dispatch(setWindow(0));
      return;
    }
  }, [window]);

  useEffect(() => {
    dispatch(clearApiData());
    getLibraryUuids();
  }, []);

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
      <main>
        <div className="libraryContainer">
          <div className="libraryHeader">
            <h2>My Library</h2>

            <input
              type="text"
              placeholder="Search Library"
              onInput={(e) => {
                dispatch(setSearchTerm(e.target.value));
              }}
            />
            <LibrarySortBySelect />
          </div>

          {podcasts.length && (
            <div className="resultsContainer">
              <LibraryResults
                libraryPodcasts={searchTerm ? newFiltered : podcasts}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Library;
