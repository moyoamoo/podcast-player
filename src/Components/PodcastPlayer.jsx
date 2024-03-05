import React from "react";
import { FaPlay } from "react-icons/fa6";
import "./CSS/footer.scss";
import { useSelector } from "react-redux";
import { selectEpisode } from "../redux/playerSlice";

const PodcastPlayer = () => {
  const episode = useSelector(selectEpisode);
  console.log(episode)
  return (
    <>
      {episode && (
        <div className="podcastPlayer">
          <p>{episode.name}</p>
          <audio src={episode.audioUrl} controls />
        </div>
      )}
    </>
  );
};

export default PodcastPlayer;
