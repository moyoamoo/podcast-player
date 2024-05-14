import React, { forwardRef } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import {
  selectIsPlaying,
  setIsLoading,
  setIsPlaying,
} from "../../redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const PlayButton = forwardRef(function PlayButton({ readyState }, audioRef) {
  const isPlaying = useSelector(selectIsPlaying);
  const dispatch = useDispatch();

  const togglePlay = () => {
    if (isPlaying && readyState) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(setIsPlaying(!isPlaying));
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
