import React from "react";
import { FaPlay } from "react-icons/fa6";
import "./CSS/footer.scss";
import { useSelector } from "react-redux";
import { selectEpisode } from "../redux/playerSlice";

const PodcastPlayer = () => {
  const episode = useSelector(selectEpisode);
  return (
 <>
       <div className="podcastPlayer">
       {episode && <p>{episode.episode.name}</p>}
        {episode && <audio src={episode.episode.audioUrl} controls />}
      </div>
 </>
  );
};

export default PodcastPlayer;
