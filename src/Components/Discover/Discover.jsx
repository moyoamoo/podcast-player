import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/librarySlice";
import { getLocationName, getCountryCharts } from "../../apiRequest";
import {
  selectRankedGenres,
  setRankedGenres,
  setRankedPodcasts,
  selectRankedPodcasts,
  setPreviousSearches,
  selectPreviousSearches,
  setCurrentCountry,
  selectCountry,
} from "../../redux/statsSlice";
import TopGenres from "./TopGenres";
import axios from "axios";
import "../CSS/stats.scss";
import TopPodcasts from "./TopPodcasts";
import PreviousSearches from "./PreviousSearches";
import { getCurrentCoordinates } from "../../currentLocation";
import { clearApiData, selectPodcastsSeries } from "../../redux/podcastSlice";
import TopCharts from "./TopCharts";

const Discover = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector(selectPodcastsSeries);
  const rankedGenres = useSelector(selectRankedGenres);
  const rankedPodcasts = useSelector(selectRankedPodcasts);
  const previousSearches = useSelector(selectPreviousSearches);
  const token = localStorage.getItem("token");
  const [coords, setCoords] = useState({});
  const country = useSelector(selectCountry);
  const [topPodcasts, setTopPodcasts] = useState([]);

  const displayTopGenres = () => {
    let _podcasts = [];
    if (podcasts) {
      podcasts.forEach((podcast) => {
        if (podcast.topChartsCountry) {
          _podcasts.push(podcast);
        }
      });
      setTopPodcasts(_podcasts);
    }
  };

  const getCoordinates = useCallback(async () => {
    try {
      const currentCoordinates = await getCurrentCoordinates();
      console.log(currentCoordinates);
      setCoords({
        lon: currentCoordinates.coords.longitude,
        lat: currentCoordinates.coords.latitude,
      });
      console.log(coords);
    } catch (e) {
      console.log(e);
      dispatch(setCurrentCountry("UNITED_STATES_OF_AMERICA"));
    }
  }, []);

  const getRecentSearches = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:6001/search_term/get/5",
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
      const { data } = await axios.get("http://localhost:6001/genres/get/5", {
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
      const { data } = await axios.get("http://localhost:6001/plays/get/5", {
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
    dispatch(clearApiData());
    getCoordinates();
    if (token) {
      getTopGenres();
      getTopPodcasts();
      getRecentSearches();
    }
  }, []);

  useEffect(() => {
    getLocationName(coords);
  }, [coords]);

  useEffect(() => {
    getCountryCharts(country);
  }, [country]);

  useEffect(() => {
    displayTopGenres();
  }, [podcasts]);

  return (
    <main>
      <div className="discoverHeader">
        <h2>Discover</h2>
      </div>
      {topPodcasts.length && <TopCharts topChartsCountry={topPodcasts} />}
      {token && Object.values(rankedPodcasts).length && <TopPodcasts />}
      {token && Object.values(rankedGenres).length && <TopGenres />}
      {token && previousSearches.length && <PreviousSearches />}
    </main>
  );
};

export default Discover;
