import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "./diskUtils";

const diskData = getStore("player");

const defaultState = {
  value: 0,
  status: "idle",
  playButton: false,
  queue: [],
  currentlyPlaying: "",
  isPlaying: false,
  isCLicked: false,
  episodeReadyState: 0,
};

const initialState = diskData ? diskData : defaultState;
initialState.isPlaying = false;
initialState.isLoading = false;

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    getEpisode: (state, { payload }) => {
      state.queue.unshift(payload);
      saveStore("player", state);
    },

    addtoQueue: (state, { payload }) => {
      state.queue.push(payload);
      saveStore("player", state);
    },

    removeFromQueue: (state, { payload }) => {
      const indexOf = state.queue.findIndex((podcast) => {
        return podcast.uuid === payload.uuid;
      });

      state.queue.splice(indexOf, 1);
      saveStore("player", state);
    },

    setPlayButton: (state, { payload }) => {
      state.playButton = payload;
      saveStore("player", state);
    },

    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
      saveStore("player", state);
    },

    setCurrentlyPlaying: (state, { payload }) => {
      state.currentlyPlaying = { payload };
      saveStore("player", state);
    },

    setIsPlaying: (state, { payload }) => {
      state.isPlaying = { payload };
      saveStore("player", state);
    },

    setIsClicked: (state, { payload }) => {
      state.isClicked = { payload };
      saveStore("player", state);
    },

    setEpisodeReadyState: (state, { payload }) => {
      state.episodeReadyState = { payload };
      saveStore("player", state);
    },
  },
});

export const {
  getEpisode,
  addtoQueue,
  removeFromQueue,
  setPlayButton,
  setIsLoading,
  setIsPlaying,
  setCurrentlyPlaying,
  setIsClicked,
  setEpisodeReadyState,
} = playerSlice.actions;

export const selectQueue = (state) => state.player.queue;
export const selectIsLoading = (state) => state.player.isLoading;
export const selectPlayButton = (state) => state.player.playButton;
export const selectIsPlaying = (state) => state.player.isPlaying;
export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying;
export const selectIsClicked = (state) => state.player.isClicked;
export const selectEpisodeReadyState = (state) =>
  state.player.episodeReadyState;

export default playerSlice.reducer;
