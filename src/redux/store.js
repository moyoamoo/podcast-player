import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "./podcastSlice";
import libraryReducer from "./librarySlice";
export const store = configureStore(
  {
    reducer: {
      podcast: podcastReducer,
      library: libraryReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
