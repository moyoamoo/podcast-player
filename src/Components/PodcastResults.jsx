import React from "react";
import { useSelector } from "react-redux";
import { selectPodcastsSeries } from "../redux/podcastSlice";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);
  return podcastSeries.map((podcast) => {
    return (
      <>
        <p>{podcast.name}</p>
        <img src={podcast.imageUrl} />
      </>
    );
  });
};

export default PodcastResults;
