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
    podDuration,
    progress,
    remainingDuration,
    buffered,
    resetPlayer
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
          
          ref={audioRef}
          resetPlayer={resetPlayer}
    
        />
      </div>
      <div className="durationControls">
        <DurationControls
          ref={audioRef}
          readyState={readyState}
          podDuration={podDuration}
          progress={progress}
        
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
