import React, { forwardRef } from "react";
import PodcastPlayerPlaybackControl from "./PodcastPlayerPlaybackControl";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { TbRewindForward30, TbRewindBackward30 } from "react-icons/tb";
import PlayButton from "./PlayButton";

const PlaybackControls = forwardRef(function PlaybackControls(
  { queue, queueIndex, setQueueIndex, readyState, isPlaying, setIsPlaying },
  audioRef
) {
  const previousPod = () => {
    if (queueIndex > 0) {
      setQueueIndex(queueIndex + 1);
    } else {
      setQueueIndex(0);
    }
  };

  const nextPod = () => {
    if (queueIndex < queue.length - 1) {
      setQueueIndex(queueIndex + 1);
    } else {
      setQueueIndex(0);
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
      <PodcastPlayerPlaybackControl
        className="controlBtn"
        func={previousPod}
        icon={<FaBackwardStep />}
      />
      <PodcastPlayerPlaybackControl
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

      <PodcastPlayerPlaybackControl
        className="controlBtn"
        func={skipForward}
        icon={<TbRewindForward30 />}
      />
      <PodcastPlayerPlaybackControl
        className="controlBtn"
        func={nextPod}
        icon={<FaForwardStep />}
      />
    </>
  );
});

export default PlaybackControls;

//
