import React, { forwardRef, useRef } from "react";
import Listens from "./Listens";

const DurationBar = forwardRef(function DurationBar(
  { progress, readyState, buffered, queue, queueIndex },
  audioRef
) {
  const podDurationRef = useRef();
  const changeCurrentTime = () => {
    if (readyState) {
      audioRef.current.currentTime =
        (audioRef.current.duration * podDurationRef.current.value) / 100;
    }
  };

  return (
    <>
      <div className="listenData">
   
        <Listens queue={queue} queueIndex={queueIndex} />
      </div>
      <div className="durationBarWrapper">
        <progress value={buffered} min="0" max="100"></progress>
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
