import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "./podcastSlice";

export const store = configureStore(
  {
    reducer: {
      podcast: podcastReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
