import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  player: {},
  queue: []
};
export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    getEpisode: (state, { payload }) => {
      console.log(state.episode)
      console.log(payload);
      state.episode = payload ;
    },

    addtoQueue: (state, {payload}) =>{
      state.queue.push(payload)
    }
  },
});

export const { getEpisode, addtoQueue } = playerSlice.actions;

export const selectEpisode = (state) => state.player.episode;
export default playerSlice.reducer;
