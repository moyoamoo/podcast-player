import React, { forwardRef, useRef } from "react";

const DurationBar = forwardRef(function DurationBar(
  { progress, readyState },
  audioRef
) {
  if (!progress) {
    progress = 0;
  }
  const podDurationRef = useRef();
  const changeCurrentTime = () => {
    if (readyState) {
      audioRef.current.currentTime =
        (audioRef.current.duration * podDurationRef.current.value) / 100;
    }
  };
  return (
    <>
      <input
        className="durationBar"
        type="range"
        ref={podDurationRef}
        min="0"
        max="100"
        value={progress}
        onChange={() => {
          changeCurrentTime();
        }}
      />
    </>
  );
});

export default DurationBar;
