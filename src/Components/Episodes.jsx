import React from "react";
import { useLocation } from "react-router-dom";
import Episode from "./Episode";
import "./CSS/episodes.scss"
import ShowMoreEpisodesBtn from "./ShowMoreEpisodesBtn";
import { useState } from "react";

const Episodes = () => {
  const { state } = useLocation();
  console.log(state)
  const { podcast } = state;
  console.log(podcast);

  const [page, setPage] = useState(1);

  const addPage = () =>{
    setPage(page + 1)
  }
  
  return (
    <>
   <div className="episodesContainer">
          <h2>{podcast.name}</h2>
          <div><img src={podcast.imageUrl}/></div>
          <p className="podcastDescription">{podcast.description}</p>

   </div>
      {podcast.episodes.map((episode)=>{
        return <Episode episode={episode}/>
      })}
      <ShowMoreEpisodesBtn podcastUuid={podcast.uuid} page={page} addPage={addPage}/>
    </>
  );
};

export default Episodes;
