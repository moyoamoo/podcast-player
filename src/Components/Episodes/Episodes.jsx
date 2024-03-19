import React from "react";
import { useParams } from "react-router-dom";
import Episode from "../Episode/Episode";
import "../CSS/episodes.scss";
import ShowMoreEpisodesBtn from "./ShowMoreEpisodesBtn";

import { useSelector } from "react-redux";
import { selectPodcast } from "../../redux/podcastSlice";

import { formatGenres } from "../utils";

import PodcastDetails from "./PodcastDetails";

const Episodes = () => {
  const { id } = useParams();
  const podcast = useSelector(selectPodcast(id));
  let formattedGenres;

  // const epLength = useSelector(selectEpisodeLength);

  if (podcast.genres) {
    formattedGenres = formatGenres(podcast.genres);
  }

  return (
    <>
      <PodcastDetails podcast={podcast} />
      {podcast.episodes.map((episode) => {
        return (
          <Episode episode={episode} podcast={podcast} key={episode.uuid} />
        );
      })}
      <div className="showMoreContainer">
        <ShowMoreEpisodesBtn podcastUuid={podcast.uuid} />
      </div>
    </>
  );
};

export default Episodes;
