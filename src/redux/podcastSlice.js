import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  status: "idle",
  apiData: { searchForTerm: {} },
};
export const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState,
  reducers: {
    storeApiData: (state, { payload }) => {
      state.apiData = payload;
    },

    storeAdditionalApiData: (state, {payload}) =>{
      console.log(state.apiData)
      const indexOf = state.apiData.searchForTerm.podcastSeries.findIndex((podcast)=>{
        console.log(payload.getPodcastSeries.uuid)
        console.log(podcast.uuid)
        return podcast.uuid === payload.uuid
        //find right one in object
        //find index and append to old data
        ///make new array and but new data in there 
        //then store will in sync 

        //get data from store and not link 
      
      })
      console.log(indexOf)
    }
  },
});


export const { storeApiData, storeAdditionalApiData} = podcastSlice.actions;

export const selectPodcastsSeries = (state) =>
  state.podcast.apiData.searchForTerm.podcastSeries;
export default podcastSlice.reducer;
