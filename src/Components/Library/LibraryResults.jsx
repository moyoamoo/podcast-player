import React from "react";
import LibraryPodcast from "./LibraryPodcast";
const LibraryResults = ({libraryPodcasts}) => {
 

  return libraryPodcasts.map((podcast) => {
    return <LibraryPodcast podcast={podcast} key={podcast.uuid} />;
  });
};

export default LibraryResults;
