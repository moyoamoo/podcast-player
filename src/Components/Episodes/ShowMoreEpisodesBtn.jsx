import React from "react";
import { getPodcastByUuid } from "../../apiRequest";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectEpisodeLength, selectSortOrder } from "../../redux/podcastSlice";

const ShowMoreEpisodesBtn = ({ podcastUuid }) => {
  const sortBy = useSelector(selectSortOrder);
  console.log(sortBy);
  const [page, setPage] = useState(1);
  // let episodeLength = useSelector(selectEpisodeLength);

  const addPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <button
        className="showMoreEps"
        onClick={() => {
          console.log(podcastUuid);
          getPodcastByUuid(podcastUuid, sortBy, page + 1, "showMore");
          addPage();
        }}
      >
        Show More
      </button>
    </>
  );
};

export default ShowMoreEpisodesBtn;
