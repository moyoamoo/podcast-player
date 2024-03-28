import React, { forwardRef, useRef } from "react";

const DurationBar = forwardRef(function DurationBar(
  { progress, readyState, buffered },
  audioRef
) {
  const podDurationRef = useRef();
  const changeCurrentTime = () => {
    if (readyState) {
      audioRef.current.currentTime =
        (audioRef.current.duration * podDurationRef.current.value) / 100;
    }
  };

  console.log(buffered);
  return (
    <>
      <div className="durationBarWrapper">
        <progress value={buffered} min="0" max="100">
        </progress>
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
      </div>
    </>
  );
});

export default DurationBar;
