import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Episode from "./Episode";
import "./CSS/episodes.scss";
import ShowMoreEpisodesBtn from "./ShowMoreEpisodesBtn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPodcast } from "../redux/podcastSlice";
import { selectEpisodeLength, setOrder } from "../redux/podcastSlice";
import { getSortedData } from "../apiRequest";

const Episodes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const podcast = useSelector(selectPodcast(id));
  const epLength = useSelector(selectEpisodeLength);

  let genre;
  let formattedGenres = [];
  for (let i = 0; i < podcast.genres.length; i++) {
    genre = podcast.genres[i].split("PODCASTSERIES_");
    formattedGenres.push(genre[1].replaceAll("_", " ").toLowerCase());
  }
  return (
    <>
      <div className="episodesContainer">
        <h2>{podcast.name}</h2>
        <div>
          <img src={podcast.imageUrl} />
        </div>
        <p className="podcastDescription">{podcast.description}</p>
        <div>
          {formattedGenres.map((genre) => {
            return <p className="genres">{genre}</p>;
          })}
        </div>
        <div>
          <select
            onChange={(e) => {
              getSortedData(podcast.uuid, e.target.value, 1);
              dispatch(setOrder(e.target.value));
            }}
          >
            <option>---Sort By---</option>
            <option value="1">Sort by Oldest</option>
            <option value="2">Sort by Newest</option>
          </select>
        </div>
      </div>
      {podcast.episodes.map((episode) => {
        return <Episode episode={episode} podcast={podcast} key={episode.uuid} />;
      })}
     
        <ShowMoreEpisodesBtn podcastUuid={podcast.uuid} />
     
    </>
  );
};

export default Episodes;
