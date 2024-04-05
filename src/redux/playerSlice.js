import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "./diskUtils";
import { isWithinInterval } from "date-fns";

const diskData = getStore("player");

const defaultState = {
  value: 0,
  status: "idle",
  playButton: false,
  queue: [],
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
  },
});

export const {
  getEpisode,
  addtoQueue,
  removeFromQueue,
  setPlayButton,
  setIsLoading,
} = playerSlice.actions;

export const selectQueue = (state) => state.player.queue;
export const selectIsLoading = (state) => state.player.isLoading;
export const selectPlayButton = (state) => state.player.playButton;
export default playerSlice.reducer;
