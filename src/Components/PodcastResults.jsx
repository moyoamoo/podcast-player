import React from "react";
import { useSelector } from "react-redux";
import { selectPodcastsSeries } from "../redux/podcastSlice";
import { Link } from "react-router-dom";

import Podcast from "./Podcast";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);
  return !podcastSeries ? (
    <Spinner />
  ) : (
    podcastSeries.map((podcast) => {
      return (
        <Link to="/episodes" state={{ podcast }}>
          <Podcast podcast={podcast} key={podcast.uuid} />
        </Link>
      );
    })
  );
};

export default PodcastResults;
