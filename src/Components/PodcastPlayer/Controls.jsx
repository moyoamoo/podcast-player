import { forwardRef } from "react";
import PlaybackControls from "./PlaybackControls";
import DurationControls from "./DurationControls";
import BottomPlaybackControls from "./BottomPlaybackControls";
import VolumeControls from "./VolumeControls";

const Controls = forwardRef(function Controls(
  {
    queue,
    queueIndex,
    setQueueIndex,
    readyState,
    isPlaying,
    setIsPlaying,
    podDuration,
    progress,
    remainingDuration,
    buffered,
    setPodDuration
  },
  audioRef
) {
  return (
    <>
      <div className="playbackControls">
        <PlaybackControls
          queue={queue}
          queueIndex={queueIndex}
          setQueueIndex={setQueueIndex}
          readyState={readyState}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          ref={audioRef}
          setPodDuration={setPodDuration}
    
        />
      </div>
      <div className="durationControls">
        <DurationControls
          ref={audioRef}
          readyState={readyState}
          podDuration={podDuration}
          progress={progress}
          isPlaying={isPlaying}
          setIsPlaying={isPlaying}
          remainingDuration={remainingDuration}
          buffered={buffered}
          queue={queue}
          queueIndex={queueIndex}
        />
      </div>
      <div className="bottomControls">
        <div className="bottomPlaybackControls ">
          <BottomPlaybackControls ref={audioRef} />
        </div>

        <div className="volumeControls">
          <VolumeControls ref={audioRef} />
        </div>
      </div>
    </>
  );
});

export default Controls;
