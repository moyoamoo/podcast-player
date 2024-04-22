import { forwardRef } from "react";
import { formatSeconds } from "../utils";
import DurationBar from "./DurationBar";
import PodcastPlayerTime from "./PodcastPlayerTime";

const DurationControls = forwardRef(function DurationControls(
  {
    readyState,
    podDuration,
    progress,
    remainingDuration,
    buffered,
    queue,
    queueIndex,
  },
  audioRef
) {
  return (
    <>
      <PodcastPlayerTime func={formatSeconds} time={remainingDuration} />
      <DurationBar
        progress={progress}
        ref={audioRef}
        readyState={readyState}
        buffered={buffered}
        queue={queue}
        queueIndex={queueIndex}
      />
      <PodcastPlayerTime func={formatSeconds} time={podDuration} />
    </>
  );
});
export default DurationControls;
