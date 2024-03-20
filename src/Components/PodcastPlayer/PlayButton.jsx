import React, { forwardRef } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

const PlayButton = forwardRef(function PlayButton(
  { isPlaying, readyState, setIsPlaying },
  audioRef
) {
  const togglePlay = () => {
    console.log(isPlaying)
    if (isPlaying && readyState) {
      audioRef.current.pause();
      setIsPlaying(false);

    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
    console.log(isPlaying)
  };

  return (
    <>
      <button
        className="controlBtn"
        // onKeyDown={(e)=>{
        //   if(e.key === " "){
        //     togglePlay()
        //   }
        // }}
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
