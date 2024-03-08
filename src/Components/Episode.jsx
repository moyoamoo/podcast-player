import React from "react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { store } from "../redux/store";
import { addtoQueue, getEpisode, getPodcast } from "../redux/playerSlice";
import { setMessage } from "../redux/librarySlice";

const Episode = ({ episode, podcast}) => {
  const [showDescription, setDescription] = useState(false);

  const toggleDescription = () => {
    setDescription(!showDescription);
  };
  return (
    <div className="episodeContainer">
      <div className="epHeader">
        <h3>{episode.name}</h3>
        <p>{new Date(episode.datePublished * 1000).toDateString()}</p>
        <button
          onClick={() => {
            store.dispatch(getEpisode(episode));
            store.dispatch(getPodcast(podcast))
          }}
        >
          <FaPlay />
        </button>
      </div>
      <button className="showBtn" onClick={toggleDescription}>
        {showDescription ? "Hide Description" : "Show Description"}
      </button>
      <button
        onClick={() => {
          store.dispatch(addtoQueue(episode));
        }}
      >
        Add to queue
      </button>

      <div
        dangerouslySetInnerHTML={{__html:episode.description}}
        className={showDescription ? "epDescription" : "epDescriptionNone"}
      ></div>
    </div>
  );
};

export default Episode;
