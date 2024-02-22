import React from "react";
import "./generic.css";
import Search from "./Components/Search";
import PodcastResults from "./Components/PodcastResults";
import { getPodcastData } from "./apiRequest";

const App = () => {
  getPodcastData()
  return (
    <>
      <Search />
      <PodcastResults/>
    </>
  );
};

export default App;

