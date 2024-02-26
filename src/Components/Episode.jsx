import React from "react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { store } from "../redux/store";
import { getEpisode } from "../redux/playerSlice";
 
const Episode = ({ episode }) => {
  const [showDescription, setDescription] = useState(false);
  const toggleDescription = () => {
    setDescription(!showDescription);
  };
  return (
    <div className="episodeContainer">
      <div className="epHeader">
        <h3>{episode.name}</h3>
        <button
          onClick={() => {
            store.dispatch(getEpisode(episode));
          }}
        >
          <FaPlay />
        </button>
      </div>
      <button className="showBtn" onClick={toggleDescription}>
        {showDescription ? "Hide Description" : "Show Description"}
      </button>

      <p className={showDescription ? "epDescription" : "epDescriptionNone"}>
        {episode.description}
      </p>

    </div>
  );
};

export default Episode;
