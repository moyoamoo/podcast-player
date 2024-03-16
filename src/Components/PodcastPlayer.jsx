import React, { useState, useRef, useEffect } from "react";
import "./CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectQueue } from "../redux/playerSlice";
import { setListened } from "../redux/statsSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import PlaybackControls from "./PlaybackControls";
import VolumeControls from "./VolumeControls";
import BottomPlaybackControls from "./BottomPlaybackControls";
import DurationControls from "./DurationControls";
import Controls from "./Controls";

const PodcastPlayer = () => {
  const queue = useSelector(selectQueue);
  let [queueIndex, setQueueIndex] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setpodDuration] = useState("00:00:00");
  const [remainingDuration, setRemainingDuration] = useState("00:00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setReadyState(false);
    setpodDuration("00:00:00");
    setIsPlaying(false);
  }, [queueIndex]);

  const setProgressDuration = () => {
    const progress = Math.round(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
    setProgress(progress);
  };

  return (
    <>
      {audioRef ? (
        <div className="podcastPlayer">
          <PodcastPlayerDescription queue={queue} queueIndex={queueIndex} />
          <audio
            src={queue[queueIndex].audioUrl}
            preload="metadata"
            ref={audioRef}
            onCanPlay={() => {
              setReadyState(true);
            }}
            onPlay={() => {
              const displayTime = setInterval(() => {
                if (audioRef.current.currentTime) {
                  let seconds = audioRef.current.currentTime;

                  if (typeof seconds !== "number") {
                    return setRemainingDuration(0);
                  }
                  setRemainingDuration(seconds);
                  setProgressDuration();
                } 
              }, 1000);
            }}
            onDurationChange={(e) => {
              let seconds = e.currentTarget.duration;
              setpodDuration(seconds);
            }}
            onEnded={() => {
              dispatch(setListened(queue[queueIndex].podcastUuid));
              dispatch(setGenres(queue[queueIndex].genres));
              if (queueIndex < queue.length - 1) {
                queueIndex++;
              } else {
                queueIndex = 0;
              }
              clearInterval(displayTime);
            }}
          ></audio>
          <Controls
            ref={audioRef}
            queue={queue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            readyState={readyState}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            podDuration={podDuration}
            progress={progress}
            remainingDuration={remainingDuration}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PodcastPlayer;
