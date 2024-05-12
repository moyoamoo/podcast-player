import { createSlice } from "@reduxjs/toolkit";
import sha256 from "sha256";
import { getStore, saveStore } from "./diskUtils";

const diskData = getStore("library");

const initialState = {
  value: 0,
  status: "idle",
  window: 1,
  screen: 1,
  loggedIn: true,
  userLibrary: [],
  searchTerm: "",
  email: "",
  token: "",
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
      if (state.userLibrary.includes(payload)) {
        return;
      }

      state.userLibrary.push(...payload);
      saveStore("library", state);
    },

    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      saveStore("library", state);
    },

    setEmail: (state, { payload }) => {
      state.email = payload;
      saveStore("library", state);
    },

    setScreen: (state, { payload }) => {
      state.screen = payload;
      saveStore("library", state);
    },

    setToken: (state, { payload }) => {
      console.log(payload);
      if (!payload) {
        console.log("clear store");
        //immer way to clear store
        Object.assign(state, initialState);
        saveStore("library", state);
        return;
      }
      state.token = payload;
      saveStore("library", state);
    },
  },
});

export const {
  searchLibraryPodcast,
  setNewUser,
  setWindow,
  setScreen,
  setMessage,
  setLoggedIn,
  setSearchTerm,
  setEmail,
  setToken,
} = librarySlice.actions;

export const selectSearchTerm = (state) => state.library.searchTerm;
export const selectWindow = (state) => state.library.window;
export const selectScreen = (state) => state.library.screen;
export const selectUser = (state) => state.library.user;
export const selectMessage = (state) => state.library.message;
export const selectLoggedIn = (state) => state.library.loggedIn;
export const selectUserLibrary = (state) => state.library.userLibrary;
export const selectEmail = (state) => state.library.email;
export const selectToken = (state) => state.library.token;

export default librarySlice.reducer;
