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
    
let genre;
let formattedGenres = [];
for (let i = 0; i < podcast.genres.length; i++) {
  genre = podcast.genres[i].split("PODCASTSERIES_")
  formattedGenres.push(genre[1].replaceAll("_", " ").toLowerCase())
}
  return (
    <>
   <div className="episodesContainer">
          <h2>{podcast.name}</h2>
          <div><img src={podcast.imageUrl}/></div>
          <p className="podcastDescription">{podcast.description}</p>
          <div>
            {formattedGenres.map((genre)=>{
              return <p className="genres">{genre}</p>
            })}
          </div>

   </div>
      {podcast.episodes.map((episode)=>{
        return <Episode episode={episode} key={episode.uuid}/>
      })}
      <ShowMoreEpisodesBtn podcastUuid={podcast.uuid}/>
    </>
  );
};

export default Episodes;
