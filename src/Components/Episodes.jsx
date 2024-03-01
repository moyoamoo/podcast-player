import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Episode from "./Episode";
import "./CSS/episodes.scss"
import ShowMoreEpisodesBtn from "./ShowMoreEpisodesBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPodcast } from "../redux/podcastSlice";

const Episodes = () => {
  const {id} = useParams();
  console.log(id)
  const podcast = useSelector(selectPodcast(id))
  console.log(podcast)
  
  
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
      <ShowMoreEpisodesBtn podcastUuid={podcast.uuid}/>
    </>
  );
};

export default Episodes;
