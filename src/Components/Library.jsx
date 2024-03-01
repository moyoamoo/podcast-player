import React from "react";
import LibraryResults from "./LibraryResults";
import { store } from "../redux/store";
import { getLibrary, searchLibraryPodcast} from "../redux/librarySlice";

const Library = () => {
  const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
  store.dispatch(getLibrary(userLibrary));

  return (
    <>
    <div>
      
    </div>
      <h1>My Library</h1>
      <input
        type="text"
        placeholder="Search Library"
        onInput={(e) => {
          store.dispatch(searchLibraryPodcast(e.target.value));
        }}
      />
      <LibraryResults />
      
    </>
  );
};

export default Library;
