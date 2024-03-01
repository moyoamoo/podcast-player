import React from "react";
import { getEpisodeData } from "../apiRequest";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectEpisodeLength } from "../redux/podcastSlice";

const ShowMoreEpisodesBtn = ({ podcastUuid }) => {
  const [page, setPage] = useState(1);
  let episodeLength = useSelector(selectEpisodeLength);

  const addPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      
        <button
          onClick={() => {
            console.log(podcastUuid);
            getEpisodeData(podcastUuid, page + 1);
            addPage();
          }}
        >
          Show More
        </button>
    
    </>
  );
};

export default ShowMoreEpisodesBtn;
