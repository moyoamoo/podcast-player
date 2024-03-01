import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  apiData: { searchForTerm: {} },
};
export const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState,
  reducers: {
    storeApiData: (state, { payload }) => {
      state.apiData = payload;
    },

    storeAdditionalApiData: (state, { payload }) => {
      console.log(payload.getPodcastSeries.uuid);
      const indexOf = state.apiData.searchForTerm.podcastSeries.findIndex(
        (podcast) => {
          console.log(payload.getPodcastSeries.uuid);
          console.log(podcast.uuid);
          return podcast.uuid === payload.getPodcastSeries.uuid;
        }
      );
      console.log(indexOf);
      const { episodes } = payload.getPodcastSeries;
      console.log(episodes);
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes.push(
        ...payload.getPodcastSeries.episodes
      );
    },

    storeEpisodeLength : (state, {payload}) =>{
      state.episodeLength = payload;
    }
  },
});

export const { storeApiData, storeAdditionalApiData, storeEpisodeLength} = podcastSlice.actions;

export const selectPodcastsSeries = (state) =>
  state.podcast.apiData.searchForTerm.podcastSeries;
export const selectPodcast = (id) => (state) => {
  return state.podcast.apiData.searchForTerm.podcastSeries.find((podcast) => {
    return podcast.uuid == id;
  });
};
export const selectEpisodeLength = (state) =>{
  state.podcast.episodeLength
}
export default podcastSlice.reducer;
