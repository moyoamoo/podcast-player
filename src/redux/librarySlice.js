import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
const initialState = {
  value: 0,
  status: "idle",
  library: [],
};
export const librarySlice = createSlice({
  name: "librarySlice",
  initialState,
  reducers: {
    addToLibrary: (state, { payload }) => {
        console.log(payload)
        const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
        console.log(payload)
        if(userLibrary){
            const duplicate = (userLibrary).some((pod)=>{
                return pod.uuid == payload.uuid;
            });
            if(duplicate){
                return;
            }
            (userLibrary).push(payload);
            localStorage.setItem("userLibrary", JSON.stringify(userLibrary))
        } else {
            localStorage.setItem("userLibrary", JSON.stringify([payload]))
        }
    

    },
  },
});

export const { addToLibrary } = librarySlice.actions;

export const selectLibrary = (state) =>
  state.library;
export default librarySlice.reducer;
