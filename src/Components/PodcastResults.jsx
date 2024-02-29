import React from "react";
import { useSelector } from "react-redux";
import { selectPodcastsSeries } from "../redux/podcastSlice";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

import Podcast from "./Podcast";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);
  console.log(podcastSeries)
  return !podcastSeries ? (
    <Spinner />
  ) : (
    podcastSeries.map((podcast) => {
      return (
          <Podcast podcast={podcast} key={podcast.uuid} />
      );
    })
  );
};

export default PodcastResults;
