import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  player: {},
  queue: [],
};
export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    getEpisode: (state, { payload }) => {
      state.queue.unshift(payload);
    },

    addtoQueue: (state, { payload }) => {
      state.queue.push(payload);
    },

    removeFromQueue: (state, { payload }) => {
      const indexOf = state.queue.findIndex((podcast) => {
        return podcast.uuid === payload.uuid;
      });

      state.queue.splice(indexOf, 1);
    },
  },
});

export const { getEpisode, addtoQueue, removeFromQueue } = playerSlice.actions;

export const selectQueue = (state) => state.player.queue;
export default playerSlice.reducer;
