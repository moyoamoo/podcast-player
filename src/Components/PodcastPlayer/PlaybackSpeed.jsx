import React, { forwardRef } from "react";

const PlaybackSpeed = forwardRef(function PlaybackSpeed(
  { playback, setPlayback },
  audioRef
) {
  const changePlaybackSpeed = () => {
    if (playback < 2) {
      Math.round((audioRef.current.playbackRate += 0.1) * 10) / 10;
      setPlayback(Math.round(audioRef.current.playbackRate * 10) / 10);
    } else {
      audioRef.current.playbackRate = 0.5;
      setPlayback(audioRef.current.playbackRate);
    }
  };
  return (
    <>
      <button
        className="controlBtn"
        onClick={() => {
          changePlaybackSpeed();
        }}
      >
        {playback}x
      </button>
    </>
  );
});

export default PlaybackSpeed;
