import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  apiData: { searchForTerm: { podcastSeries: [] } },
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

    deletefromLibrary: (state, { payload }) => {
      const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
      const indexOf = userLibrary.findIndex((podcast) => {
        podcast.uuid === payload;
      });
      userLibrary.splice(indexOf, 1);
      localStorage.setItem("userLibrary", JSON.stringify(userLibrary));
      state.apiData.searchForTerm.podcastSeries.splice(indexOf, 1);
    },

    storeEpisodeLength: (state, { payload }) => {
      state.episodeLength = payload;
    },

    getLibrary: (state, { payload }) => {
      const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
      if (Object.keys(state.apiData.searchForTerm.podcastSeries).length === 0) {
        state.apiData.searchForTerm.podcastSeries.push(...userLibrary);
        return;
      } else {
        let library = userLibrary.filter((libpod) => {
          return state.apiData.searchForTerm.podcastSeries.map((statepod) => {
            return libpod.uuid != statepod;
          });
        });
        console.log(library);
        // state.apiData.searchForTerm.podcastSeries.push(...library);
      }
    },

    setPodcastSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },

    addToLibrary: (state, { payload }) => {
      const libraryPodcast = { ...payload, library: true };
      const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
      if (userLibrary) {
        const duplicate = userLibrary.some((podcast) => {
          return podcast.uuid === libraryPodcast.uuid;
        });
        if (duplicate) {
          return;
        }
        userLibrary.push(libraryPodcast);
        localStorage.setItem("userLibrary", JSON.stringify(userLibrary));
      } else {
        localStorage.setItem("userLibrary", JSON.stringify([libraryPodcast]));
      }
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
} = podcastSlice.actions;

export const selectPodcastsSeries = (state) =>
  state.podcast.apiData.searchForTerm.podcastSeries;
export const selectPodcast = (id) => (state) => {
  return state.podcast.apiData.searchForTerm.podcastSeries.find((podcast) => {
    return podcast.uuid == id;
  });
};
// export const selectLibrary = (state) => {
//   return state.podcast.apiData.searchForTerm.podcastSeries.filter((podcast) => {
//     return (podcast.library === true);
//   });
// };
export const selectEpisodeLength = (state) => {
  state.podcast.episodeLength;
};
export default podcastSlice.reducer;
