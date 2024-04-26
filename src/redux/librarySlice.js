import { createSlice } from "@reduxjs/toolkit";
import sha256 from "sha256";
import { getStore, saveStore } from "./diskUtils";

const diskData = getStore("library");

const initialState = {
  value: 0,
  status: "idle",
  window: 1,
  loggedIn: true,
  userLibrary: [],
  searchTerm: "",
};
export const librarySlice = createSlice({
  name: "librarySlice",
  initialState: diskData ? diskData : initialState,
  reducers: {
    searchLibraryPodcast: (state, { payload }) => {
      state.searchTerm = payload;
      saveStore("library", state);
    },

    setNewUser: (state, { payload }) => {
      payload.password = sha256(payload.password + "ZhmyyeQaVRwu7wf");
      state.user = payload;
      saveStore("library", state);
    },

    setWindow: (state, { payload }) => {
      state.window = payload;
      saveStore("library", state);
    },

    setMessage: (state, { payload }) => {
      state.message = payload;
      saveStore("library", state);
    },

    setLoggedIn: (state) => {
      state.loggedIn = !state.loggedIn;
      saveStore("library", state);
    },

    setUserLibary: (state, { payload }) => {
      state.userLibrary.push(...payload);
    },

    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const {
  searchLibraryPodcast,
  setNewUser,
  setWindow,
  setMessage,
  setLoggedIn,
  setSearchTerm
} = librarySlice.actions;

export const selectSearchTerm = (state) => state.library.searchTerm;
export const selectWindow = (state) => state.library.window;
export const selectUser = (state) => state.library.user;
export const selectMessage = (state) => state.library.message;
export const selectLoggedIn = (state) => state.library.loggedIn;
export const selectUserLibrary = (state) => state.library.userLibrary;

export default librarySlice.reducer;
