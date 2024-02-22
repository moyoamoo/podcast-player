import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  apiData: {searchForTerm: {} }
 
};
export const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState,
  reducers: {
    storeApiData: (state, { payload }) => {
      state.apiData = payload;
    },
  },
});

export const { storeApiData } = podcastSlice.actions;

export const selectPodcastsSeries = (state) => state.podcast.apiData.searchForTerm.podcastSeries;
export default podcastSlice.reducer;
