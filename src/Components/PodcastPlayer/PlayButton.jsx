import React, { forwardRef } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { setIsLoading } from "../../redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const PlayButton = forwardRef(function PlayButton(
  { isPlaying, setIsPlaying, readyState },
  audioRef
) {


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
        {readyState ? (
          <div
            onClick={() => {
              togglePlay();
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
        ) : (
          <div className="pulsing"></div>
        )}
      </button>
    </>
  );
});

export default PlayButton;
