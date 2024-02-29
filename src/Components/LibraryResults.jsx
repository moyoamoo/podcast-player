import React from "react";
import { useSelector } from "react-redux";
import { selectLibrary, selectSearchTerm } from "../redux/librarySlice";
import LibraryPodcast from "./LibraryPodcast";
import ShowMoreEpisodesBtn from "./ShowMoreEpisodesBtn";

const LibraryResults = () => {
  const library = useSelector(selectLibrary);
  const searchTerm = useSelector(selectSearchTerm);

  if (searchTerm) {
    let libraryCopy = [...library];
    let filtered;
    filtered = libraryCopy.filter((pod) => {
      if (pod.name.toLowercase().includes(searchTerm.toLowercase())) {
        return true;
      }
    });
  }

  return (library.map((podcast) => {
    return <LibraryPodcast podcast={podcast} key={podcast.uuid} />;
  }
)
, <ShowMoreEpisodesBtn podcastUuid={podcast.uuid}/> );
 
};

export default LibraryResults;
