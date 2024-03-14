import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "./podcastSlice";
import libraryReducer from "./librarySlice";
import playerReducer from "./playerSlice";
import statsReducer from "./statsSlice";
export const store = configureStore(
  {
    reducer: {
      podcast: podcastReducer,
      library: libraryReducer,
      player: playerReducer,
      stats: statsReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
