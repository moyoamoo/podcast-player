import { createSlice } from "@reduxjs/toolkit";
import podcastSlice from "./podcastSlice";
import playerSlice from "./playerSlice";
import sha256 from "sha256";

const initialState = {
  value: 0,
  status: "idle",
};
export const librarySlice = createSlice({
  name: "librarySlice",
  initialState,
  reducers: {
    addToLibrary: (state, { payload }) => {
      const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
      if (userLibrary) {
        const duplicate = userLibrary.some((pod) => {
          return pod.uuid == payload.uuid;
        });
        if (duplicate) {
          return;
        }
        userLibrary.push(payload);
        localStorage.setItem("userLibrary", JSON.stringify(userLibrary));
      } else {
        localStorage.setItem("userLibrary", JSON.stringify([payload]));
      }
    },

    deletefromLibrary: (state, { payload }) => {
      const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
      const indexOf = userLibrary.findIndex((podcast) => {
        podcast.uuid === payload;
      });
      userLibrary.splice(indexOf, 1);
      localStorage.setItem("userLibrary", JSON.stringify(userLibrary));
      state.userLibrary.splice(indexOf, 1);
    },

    getLibrary: (state, { payload }) => {
      state.userLibrary = payload;
    },

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
  },
});

export const {
  addToLibrary,
  getLibrary,
  deletefromLibrary,
  searchLibraryPodcast,
  setNewUser,
} = librarySlice.actions;

export const selectLibrary = (state) => state.library.userLibrary;
export const selectSearchTerm = (state) => state.library.searchTerm;
export const selectWindow = (state) => state.library.window;
export default librarySlice.reducer;
