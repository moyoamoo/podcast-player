import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "./diskUtils";

const diskData = getStore("stats");

const initialState = {
  value: 0,
  status: "idle",
  listened: [],
  genres: [],
  mostListened: {},
  searches: [],
  favouriteGenres: [],
};
export const statsSlice = createSlice({
  name: "statsSlice",
  initialState: diskData ? diskData : initialState,
  reducers: {
    setListened: (state, { payload }) => {
      state.listened.push(payload);
      saveStore("stats", state);
    },

    setGenres: (state, { payload }) => {
      state.genres.push(...payload);
      saveStore("stats", state);
    },

    setMostListened: (state, { payload }) => {
      state.mostListened = payload;
      saveStore("stats", state);
    },

    setFavouriteGenres: (state, { payload }) => {
      state.favouriteGenres = payload;
      saveStore("stats", state);
    },

    setSearch: (state, { payload }) => {
      state.searches.push(payload);
    },
  },
});

export const { setListened, setGenres, setMostListened, setFavouriteGenres } =
  statsSlice.actions;

export const selectListened = (state) => state.stats.listened;
export const selectGenres = (state) => state.stats.genres;
export const selectFavouriteGenres = (state) => state.stats.favouriteGenres;

export default statsSlice.reducer;
