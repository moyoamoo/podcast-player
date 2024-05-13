import React, { forwardRef } from "react";
import PlaybackControl from "./PlaybackControl";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { TbRewindForward30, TbRewindBackward30 } from "react-icons/tb";
import PlayButton from "./PlayButton";

const PlaybackControls = forwardRef(function PlaybackControls(
  {
    queue,
    queueIndex,
    setQueueIndex,
    readyState,
    isPlaying,
    setIsPlaying,
    setPodDuration,
  },
  audioRef
) {
  const resetPlayer = () => {
    audioRef.current.currentTime = 0;
    setPodDuration(0);
    setIsPlaying(false);
  };

  const previousPod = () => {
    console.log(queueIndex);
    if (queueIndex > 0) {
      setQueueIndex(queueIndex - 1);
      resetPlayer();
    } else {
      setQueueIndex(0);
      resetPlayer();
    }
  };

  const nextPod = () => {
    if (queueIndex < queue.length - 1) {
      setQueueIndex(queueIndex + 1);
      resetPlayer();
    } else {
      setQueueIndex(0);
      resetPlayer();
    }
  };

  const skipForward = () => {
    if (audioRef.current.duration - audioRef.current.currentTime != 30) {
      audioRef.current.currentTime += 30;
    }
  };

  const skipBackward = () => {
    if (!(audioRef.current.currentTime <= 30)) {
      audioRef.current.currentTime -= 30;
    }
  };

  return (
    <>
      <PlaybackControl
        className="controlBtn"
        func={previousPod}
        icon={<FaBackwardStep />}
      />
      <PlaybackControl
        className="controlBtn"
        func={skipBackward}
        icon={<TbRewindBackward30 />}
      />

      <PlayButton
        ref={audioRef}
        isPlaying={isPlaying}
        readyState={readyState}
        setIsPlaying={setIsPlaying}
      />

      <PlaybackControl
        className="controlBtn"
        func={skipForward}
        icon={<TbRewindForward30 />}
      />
      <PlaybackControl
        className="controlBtn"
        func={nextPod}
        icon={<FaForwardStep />}
      />
    </>
  );
});

export default PlaybackControls;

//
