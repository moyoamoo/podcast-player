import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPause } from "react-icons/fa6";

import {
  getEpisode,
  selectCurrentlyPlaying,
  selectIsLoading,
  selectIsPlaying,
  setIsPlaying,
} from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import {
  selectQueue,
  setPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import playingGif from "../CSS/assets/playing.gif";

import { useAudioContext } from "../PodcastPlayer/AudioContext";

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const audioRef = useAudioContext();
  const isPlaying = useSelector(selectIsPlaying);
  const [clicked, setClicked] = useState(false);
  const currentlyPlaying = useSelector(selectCurrentlyPlaying);

  useEffect(() => {
    if (!queue.length) {
      return;
    }

    if (currentlyPlaying === episodePod.uuid && !audioRef.current.paused) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [queue]);
  return (
    <>
      
        <button
          disabled={isPlaying ? true : false}
          onClick={() => {
            dispatch(getEpisode(episodePod));
            audioRef.current.play();
            console.log(audioRef.current.paused);
            console.log(isPlaying);
          }}
        >
          <FaPlay />
        </button>

    </>
  );
};

export default EpisodePlayBtn;
