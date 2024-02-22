import React from "react";
import "./Components/CSS/generic.css"
import Search from "./Components/Search";
import PodcastResults from "./Components/PodcastResults";
import { getPodcastData } from "./apiRequest";

const App = () => {
  getPodcastData()
  return (
    <>
      <Search />
    </>
  );
};

export default App;

