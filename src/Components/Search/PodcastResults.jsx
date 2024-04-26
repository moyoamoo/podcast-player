import React from "react";
import { useSelector } from "react-redux";
import { selectPodcastsSeries } from "../../redux/podcastSlice";

import Podcast from "./Podcast";
import "../CSS/libraryPodcasts.scss";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);
  console.log(podcastSeries);

  return podcastSeries.map((podcast) => {
    return <Podcast podcast={podcast} key={podcast.uuid} />;
  });
};

export default PodcastResults;
