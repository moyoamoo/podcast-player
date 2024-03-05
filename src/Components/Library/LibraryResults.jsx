import React from "react";
import { useSelector } from "react-redux";
import LibraryPodcast from "./LibraryPodcast";
import { selectPodcastsSeries } from "../../redux/podcastSlice";

const LibraryResults = ({libraryPodcasts}) => {
 

  return libraryPodcasts.map((podcast) => {
    return <LibraryPodcast podcast={podcast} key={podcast.uuid} />;
  });
};

export default LibraryResults;
