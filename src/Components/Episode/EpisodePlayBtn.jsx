import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPause } from "react-icons/fa6";

import {
  getEpisode,
  selectCurrentPlaying,
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
import staticImg from "../CSS/assets/static.png";
import { useAudioContext } from "../PodcastPlayer/AudioContext";

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const audioRef = useAudioContext();
  const isPlaying = useSelector(selectIsPlaying);
  const [clicked, setClicked] = useState(false);
  const currentPlaying = useSelector(selectCurrentPlaying)

  useEffect(() => {
    if (!queue.length) {
      return;
    }

    if (clicked) {
      console.log(currentPlaying)
      if (currentPlaying.uuid === episodePod.uuid && !isLoading) {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  }, [queue, clicked]);

  return (
    <>
      {!isLoading ? (
        <button
          onClick={() => {
            dispatch(getEpisode(episodePod));
            setClicked(true);
          }}
        >
          {isPlaying && queue[0].uuid === episodePod.uuid ? (
            <img src={playingGif} />
          ) : !isPlaying && queue[0].uuid === episodePod.uuid ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
      ) : (
        <button>
          <FaPlay />
        </button>
      )}
    </>
  );
};

export default EpisodePlayBtn;
