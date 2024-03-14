import { createSlice } from "@reduxjs/toolkit";
import { getStore, saveStore } from "./diskUtils";

const diskData = getStore("podcast");
const initialState = {
  value: 0,
  status: "idle",
  apiData: { searchForTerm: { podcastSeries: [] } },
  userLibrary: [],
  sortOrder: "2",
  // emptySearch: false,
};

export const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState,
  reducers: {
    storeApiData: (state, { payload }) => {
      state.apiData = payload;
      saveStore("podcast", store);
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
      saveStore("podcast", store);
    },

    appendApiData: (state, { payload }) => {
      payload["library"] = true;
      state.apiData.searchForTerm.podcastSeries.push(payload);
      console.log(state.apiData.searchForTerm.podcastSeries);
      saveStore("podcast", store);
    },

    deletefromLibrary: (state, { payload }) => {
      const indexOf = state.userLibrary.findIndex((uuid) => {
        uuid === payload;
      });
      state.userLibrary.splice(indexOf, 1);
      saveStore("podcast", store);
    },

    storeEpisodeLength: (state, { payload }) => {
      state.episodeLength = payload;
      saveStore("podcast", store);
    },

    sortEpisodeOrder: (state, { payload }) => {
      console.log(payload);
      const indexOf = state.apiData.searchForTerm.podcastSeries.findIndex(
        (podcast) => {
          return podcast.uuid === payload.uuid;
        }
      );
      console.log(indexOf);
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes.length = 0;
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes.push(
        ...payload.episodes
      );
      saveStore("podcast", store);
    },

    setPodcastSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      saveStore("podcast", store);
    },

    sortPodcasts: (state, { payload }) => {
      switch (payload) {
        case "sortAsc":
          state.apiData.searchForTerm.podcastSeries.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (a.name < b.name) {
              return -1;
            }
          });
          break;
        case "sortDesc":
          state.apiData.searchForTerm.podcastSeries.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            }
          });
          break;

        default:
          break;
      }
      saveStore("podcast", store);
    },

    clearApiData: (state) => {
      state.apiData = initialState.apiData;
      saveStore("podcast", store);
    },

    addToLibrary: (state, { payload }) => {
      for (let i = 0; i < state.userLibrary.length; i++) {
        if (state.userLibrary[i] === payload) {
          return;
        }
      }
      state.userLibrary.push(payload);
      saveStore("podcast", store);
    },

    //order of podcast sort - oldest/newest
    setOrder: (state, { payload }) => {
      state.sortOrder = payload;
      saveStore("podcast", store);
    },

    setEmptySearch: (state, { payload }) => {
      state.emptySearch = payload;
      saveStore("podcast", store);
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
  sortEpisodeOrder,
  setOrder,
  sortPodcasts,
  setEmptySearch,
  clearApiData,
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

export const selectEmptySearch = (state) => {
  return state.podcast.emptySearch;
};
export const selectSearchTerm = (state) => {
  return state.podcast.searchTerm;
};

export const selectSortOrder = (state) => {
  return state.podcast.sortOrder;
};
export const selectEpisodeLength = (state) => {
  state.podcast.episodeLength;
};
export default podcastSlice.reducer;
