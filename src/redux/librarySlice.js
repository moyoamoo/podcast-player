import { createSlice } from "@reduxjs/toolkit";

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

    getLibrary: (state, { payload }) => {
        state.userLibrary = payload
    },
  },
});

export const { addToLibrary, getLibrary } = librarySlice.actions;

export const selectLibrary = (state) => state.library.userLibrary;
export default librarySlice.reducer;
