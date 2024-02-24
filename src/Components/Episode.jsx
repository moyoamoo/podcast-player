import React from "react";

const Episode = ({ episode }) => {
  return (
    <div className="episodeConntainer">
      <h3>{episode.name}</h3>
      <p>{episode.description}</p>
      <audio controls src={episode.audioUrl} />
    </div>
  );
};

export default Episode;
