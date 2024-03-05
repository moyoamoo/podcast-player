import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  apiData: { searchForTerm: { podcastSeries: [] } },
  userLibrary: [],
};

export const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState,
  reducers: {
    storeApiData: (state, { payload }) => {
      state.apiData = payload;
    },

    //adds new episodes
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

    appendApiData: (state, { payload }) => {
      payload["library"] = true;
      state.apiData.searchForTerm.podcastSeries.push(payload);
      console.log(state.apiData.searchForTerm.podcastSeries);
    },

    deletefromLibrary: (state, { payload }) => {
      const indexOf = state.userLibrary.findIndex((podcast) => {
        podcast.uuid === payload;
      });
      state.userLibrary.splice(indexOf, 1);
    },

    storeEpisodeLength: (state, { payload }) => {
      state.episodeLength = payload;
    },

    setPodcastSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      console.log(payload);
    },

    addToLibrary: (state, { payload }) => {
      for (let i = 0; i < state.userLibrary.length; i++) {
        if (state.userLibrary[i] === payload) {
          return;
        }
      }
      state.userLibrary.push(payload);
    },
  },
});

export const {
  storeApiData,
  storeAdditionalApiData,
  storeEpisodeLength,
  getLibrary,
  addToLibrary,
  deletefromLibrary,
  setPodcastSearchTerm,
  getLibraryState,
  appendApiData,
} = podcastSlice.actions;

export const selectPodcastsSeries = (state) =>
  state.podcast.apiData.searchForTerm.podcastSeries;
export const selectPodcast = (id) => (state) => {
  return state.podcast.apiData.searchForTerm.podcastSeries.find((podcast) => {
    return podcast.uuid == id;
  });
};
export const selectLibrary = (state) => {
  return state.podcast.userLibrary;
};


export const selectSearchTerm = (state) => {
  return state.podcast.searchTerm;
};
export const selectEpisodeLength = (state) => {
  state.podcast.episodeLength;
};
export default podcastSlice.reducer;
