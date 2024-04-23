import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "./diskUtils";

const diskData = getStore("stats");

const initialState = {
  value: 0,
  status: "idle",
  listened: [],
  mostListened: {},
  searches: [],
  rankedGenres: {},
  rankedPodcasts: {},
  listenData: {},
  previousSearches: [],
};
export const statsSlice = createSlice({
  name: "statsSlice",
  initialState: diskData ? diskData : initialState,
  reducers: {
    setListened: (state, { payload }) => {
      state.listened.push(payload);
      saveStore("stats", state);
    },

    //ranked genres from database
    setRankedGenres: (state, { payload }) => {
      state.rankedGenres = payload;
      saveStore("stats", state);
    },

    //ranked podcasts from database
    setRankedPodcasts: (state, { payload }) => {
      state.rankedPodcasts = payload;
      saveStore("stats", state);
    },

    setSearch: (state, { payload }) => {
      state.searches.push(payload);
    },

    setPreviousSearches: (state, { payload }) => {
      state.previousSearches = payload;
    },
    setListenData: (state, { payload }) => {
      state.listenData = payload;
    },
  },
});

export const {
  setListened,
  setGenres,
  setMostListened,
  setSearch,
  setRankedGenres,
  setRankedPodcasts,
  setListenData,
  setPreviousSearches,
} = statsSlice.actions;

export const selectListened = (state) => state.stats.listened;
export const selectGenres = (state) => state.stats.genres;
export const selectRankedGenres = (state) => state.stats.rankedGenres;
export const selectRankedPodcasts = (state) => state.stats.rankedPodcasts;
export const selectListenData = (state) => state.stats.listenData;
export const selectPreviousSearches = (state) => state.stats.previousSearches;

export default statsSlice.reducer;
