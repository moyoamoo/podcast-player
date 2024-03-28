import React, { useState, useRef, useEffect } from "react";
import "../CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectQueue } from "../../redux/playerSlice";
import { setListened, setGenres } from "../../redux/statsSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import Controls from "./Controls";

const PodcastPlayer = () => {
  const queue = useSelector(selectQueue);
  let [queueIndex, setQueueIndex] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setPodDuration] = useState("00:00:00");
  const [remainingDuration, setRemainingDuration] = useState("00:00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState();
  const [lastClick, setLastClick] = useState(Date.now());
  const audioRef = useRef();
  const dispatch = useDispatch();
  let t;

  //clean up podcast player
  useEffect(() => {
    setReadyState(false);
    setPodDuration("00:00:00");
    setRemainingDuration("00:00:00");
    clearInterval(t);
  }, [queue]);


  useEffect(() => {
    
    if (readyState) {
      Promise.resolve(audioRef.current.play()).catch(() => {});
    }
  }, [readyState, queue]);

  const displayTime = () => {
    t = setInterval(() => {
      let seconds = audioRef.current.currentTime;
      if (typeof seconds !== "number") {
        return setRemainingDuration(0);
      }
      setRemainingDuration(seconds);
      setProgressDuration();
    }, 1000);
    setTimer(t);
  };

  const setProgressDuration = () => {
    const progress = Math.round(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
    setProgress(progress);
  };

  return (
    <>
      {queue.length > 0 ? (
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
              displayTime();
              setIsPlaying(!audioRef.current.paused);
            }}
            onDurationChange={(e) => {
              setPodDuration(e.currentTarget.duration);
            }}
            onEnded={() => {
              dispatch(setListened(queue[queueIndex].podcastUuid));
              dispatch(setGenres(queue[queueIndex].genres));
              if (queueIndex < queue.length - 1) {
                queueIndex++;
              } else {
                queueIndex = 0;
              }
              clearInterval(t);
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
