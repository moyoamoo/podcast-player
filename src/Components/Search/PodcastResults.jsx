import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPodcastsSeries, setIsLoading } from "../../redux/podcastSlice";

import Podcast from "./Podcast";
import "../CSS/libraryPodcasts.scss";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);

  let counter = 1
 

  return podcastSeries.map((podcast) => {
    return <Podcast podcast={podcast} key={podcast.uuid}  counter={counter++}/>;
  });
};

export default PodcastResults;
