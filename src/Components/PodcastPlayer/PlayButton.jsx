import React, { forwardRef, useEffect } from "react";
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
    //   audioRef.current.pause();
    //   setIsPlaying(!isPlaying);
    // } else if (!isPlaying && !readyState) {
    //   audioRef.current.play();
    //   setIsPlaying(!isPlaying);
    if (
      audioRef.current.paused &&
      !audioRef.current.ended &&
      audioRef.current.readyState > 2
    ) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };


  return (
    <>
      <button className="playBtn">
        {readyState <= 2 ? (
          <div className="pulsing"></div>
        ) : (
          <div
            onClick={() => {
              togglePlay();
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
