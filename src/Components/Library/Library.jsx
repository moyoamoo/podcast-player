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
} from "../../redux/librarySlice";
import { getPodcastByUuid } from "../../apiRequest";

import "../CSS/libraryPodcasts.scss";
import Spinner from "../Spinner";

const Library = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  let podcasts = useSelector(selectPodcastsSeries);
  const searchTerm = useSelector(selectSearchTerm);

  //gets uuids from database
  const getLibraryUuids = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:6001/library/get", {
        headers: {
          token: token,
        },
      });

      console.log(data.data);

      if (data.data) {
        data.data.forEach((uuid) => {
          getPodcastByUuid(uuid, 2, 1, "append");
        });
      }
    } catch (e) {
      dispatch(setMessage("Podcasts Unavailable"));
    }
  }, []);

  //get podcasts using uuids

  useEffect(() => {
    if (!token) {
      dispatch(setWindow(0));
      return;
    }
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
      <div className="libraryContainer">
        <h1>My Library</h1>

        <input
          type="text"
          placeholder="Search Library"
          onInput={(e) => {
            dispatch(setSearchTerm(e.target.value));
          }}
        />
        <LibrarySortBySelect />
        {podcasts.length ? (
          <LibraryResults
            libraryPodcasts={searchTerm ? newFiltered : podcasts}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Library;
