import React, { forwardRef } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { selectEpisodeReadyState, setIsLoading } from "../../redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const PlayButton = forwardRef(function PlayButton(
  { isPlaying, setIsPlaying, readyState },
  audioRef
) {
  const episodeReadyState = useSelector(selectEpisodeReadyState);
  const togglePlay = () => {
    if (isPlaying && readyState) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button className="playBtn">
        {!readyState || !episodeReadyState || episodeReadyState <= 3 ? (
          <div className="pulsing"></div>
        ) : (
          <div
            onClick={() => {
              togglePlay();
              console.log(audioRef.current.readyState);
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
        )}
      </button>
    </>
  );
});

export default PlayButton;
