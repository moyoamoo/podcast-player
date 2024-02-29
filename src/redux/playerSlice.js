import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  player: { episode: {} },
};
export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    getEpisode: (state, { payload }) => {
      console.log(payload);
      state.episode = payload;
    },
  },
});

export const { getEpisode } = playerSlice.actions;

export const selectEpisode = (state) => state.player.episode;
export default playerSlice.reducer;
