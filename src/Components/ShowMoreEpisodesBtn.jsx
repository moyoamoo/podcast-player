import React from "react";
import { getEpisodeData } from "../apiRequest";
import { getEpisode } from "../redux/playerSlice";


const ShowMoreEpisodesBtn = ({podcastUuid, page, addPage}) => {
  return (
    <>
      <button onClick={()=>{
        console.log(podcastUuid)
        getEpisodeData(podcastUuid, page + 1)
        addPage()
      }}>Show More</button>
    </>
  );
};

export default ShowMoreEpisodesBtn;
