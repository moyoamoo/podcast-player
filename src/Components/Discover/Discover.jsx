import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/librarySlice";
import {
  selectRankedGenres,
  setRankedGenres,
  setRankedPodcasts,
  selectRankedPodcasts,
  setPreviousSearches,
  selectPreviousSearches,
} from "../../redux/statsSlice";
import TopGenres from "./TopGenres";
import axios from "axios";
import "../CSS/stats.scss";
import TopPodcasts from "./Top Podcasts";
import PreviousSearches from "./PreviousSearches";

const Discover = () => {
  const dispatch = useDispatch();
  const rankedGenres = useSelector(selectRankedGenres);
  const rankedPodcasts = useSelector(selectRankedPodcasts);
  const previousSearches = useSelector(selectPreviousSearches);
  const token = localStorage.getItem("token");

  const getRecentSearches = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:6001/search_term/get",
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.data) {
        dispatch(setPreviousSearches(data.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTopGenres = async () => {
    try {
      const { data } = await axios.get("http://localhost:6001/genres/get", {
        headers: {
          token: token,
        },
      });
      if (data.data) {
        dispatch(setRankedGenres(data.data));
      }
    } catch (e) {
      console.log(e);
      // dispatch(setMessage("Favourite Genres Unavailable"));
    }
  };

  const getTopPodcasts = async () => {
    try {
      const { data } = await axios.get("http://localhost:6001/plays/get", {
        headers: {
          token: token,
        },
      });

      if (data.data) {
        dispatch(setRankedPodcasts(data.data));
        console.log(data.data);
      }
    } catch (e) {
      console.log(e);
      // dispatch(setMessage("Favourite Podcasts Unavailable"));
    }
  };

  useEffect(() => {
    if (token) {
      getTopGenres();
      getTopPodcasts();
      getRecentSearches();
    }
  }, []);

  return (
    <main>
      <h1>Discover</h1>
      {Object.values(rankedPodcasts).length ? <TopPodcasts /> : null}
      {Object.values(rankedGenres).length ? <TopGenres /> : null}
      {previousSearches.length ? <PreviousSearches /> : null}
    </main>
  );
};

export default Discover;
