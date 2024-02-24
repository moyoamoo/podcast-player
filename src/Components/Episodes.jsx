import React from "react";
import { useLocation } from "react-router-dom";
import Episode from "./Episode";
import "./CSS/episodes.scss"

const Episodes = () => {
  const { state } = useLocation();
  const { podcast } = state;
  console.log(podcast);
  return (
    <>
   <div className="episodesContainer">
          <h2>{podcast.name}</h2>
          <div className="line"></div>
          <p className="podcastDescription">{podcast.description}</p>
          <div><img src={podcast.imageUrl}/></div>
   </div>
      {podcast.episodes.map((episode)=>{
        return <Episode episode={episode}/>
      })}
    </>
  );
};

export default Episodes;
