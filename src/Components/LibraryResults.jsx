import React from "react";
import { useSelector } from "react-redux";
import { selectLibrary } from "../redux/librarySlice";
import LibraryPodcast from "./LibraryPodcast";

const LibraryResults = () => {
  const library = useSelector(selectLibrary);
  return library.map((podcast) => {
    return <LibraryPodcast podcast={podcast} />;
  });
};

export default LibraryResults;
