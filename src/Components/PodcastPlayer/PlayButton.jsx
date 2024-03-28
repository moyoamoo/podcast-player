import React, { forwardRef} from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

const PlayButton = forwardRef(function PlayButton(
  { isPlaying, readyState, setIsPlaying },
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
      <button
        className="controlBtn"
        onClick={() => {
          togglePlay();
        }}
      >
        {readyState ? (
          isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )
        ) : (
          <div className="pulsing"></div>
        )}
      </button>
    </>
  );
});

export default PlayButton;
