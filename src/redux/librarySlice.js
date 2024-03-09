import { createSlice } from "@reduxjs/toolkit";

import sha256 from "sha256";

const initialState = {
  value: 0,
  status: "idle",
  window: 1,
  loggedIn: true
};
export const librarySlice = createSlice({
  name: "librarySlice",
  initialState,
  reducers: {
  

    searchLibraryPodcast: (state, { payload }) => {
      state.searchTerm = payload;
    },

    setNewUser: (state, { payload }) => {
      payload.password = sha256(payload.password + "ZhmyyeQaVRwu7wf");
      state.user = payload;
    },

    setWindow: (state, { payload }) => {
      state.window = payload;
    },

    setMessage: (state, { payload }) => {
      state.message = payload;
      // localStorage.setItem("message", JSON.stringify(state.message));
    },

    setLoggedIn: (state) => {
      state.loggedIn = !state.loggedIn;
    },
  },
});

export const {
  searchLibraryPodcast,
  setNewUser,
  setWindow,
  setMessage,
  setLoggedIn,
} = librarySlice.actions;


export const selectSearchTerm = (state) => state.library.searchTerm;
export const selectWindow = (state) => state.library.window;
export const selectUser = (state) => state.library.user;
export const selectMessage = (state) => state.library.message;
export const selectLoggedIn = (state) => state.library.loggedIn;

export default librarySlice.reducer;
