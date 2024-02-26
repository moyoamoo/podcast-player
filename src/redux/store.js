import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "./podcastSlice";
import libraryReducer from "./librarySlice";
import playerReducer from "./playerSlice"
export const store = configureStore(
  {
    reducer: {
      podcast: podcastReducer,
      library: libraryReducer,
      player: playerReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
