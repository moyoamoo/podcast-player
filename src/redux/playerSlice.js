import { createSlice } from "@reduxjs/toolkit";
import { saveStore, getStore } from "./diskUtils";

const diskData = getStore("player");

const initialState = {
  value: 0,
  status: "idle",
  player: {},
  queue: [],
};
export const playerSlice = createSlice({
  name: "playerSlice",
  initialState: diskData ? diskData : initialState,
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
  },
});

export const { getEpisode, addtoQueue, removeFromQueue } = playerSlice.actions;

export const selectQueue = (state) => state.player.queue;
export default playerSlice.reducer;
