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
      state.queue.push(payload);
    },

    addtoQueue: (state, { payload }) => {
      state.queue.push(payload);
    },

  },
});

export const { getEpisode, addtoQueue } = playerSlice.actions;

export const selectQueue = (state) => state.player.queue;
export default playerSlice.reducer;
