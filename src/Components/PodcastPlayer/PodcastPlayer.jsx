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
  const [buffered, setBuffered] = useState(0);
  // const [lastClick, setLastClick] = useState(Date.now());
  const audioRef = useRef();
  const dispatch = useDispatch();

  //clean up podcast player
  // useEffect(() => {
  //   if(audioRef){
  //     setReadyState(false);
  //     setPodDuration("00:00:00");
  //     setRemainingDuration("00:00:00");
  //     clearInterval(t);
  //   }

  // }, [queue[queueIndex].audioUrl]);

  useEffect(() => {
    if (audioRef) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
      console.log(isPlaying)
    }
  }, [queue[queueIndex].audioUrl]);
  // useEffect(() => {
  //   if (readyState) {
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //     // audioRef.current.duration
  //     //   ? setPodDuration(audioRef.current.duration)
  //     //   : setPodDuration("00:00:00");
  //   }
  // }, [readyState, queue]);

  const setProgressDuration = () => {
    if (audioRef.current.currentTime) {
      const progress = Math.round(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
      console.log(progress);
      setProgress(progress);
    }
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
            onProgress={(e) => {
              if (e.currentTarget.duration > 0) {
                for (let i = 0; i < e.currentTarget.buffered.length; i++) {
                  if (
                    e.currentTarget.buffered.start(
                      e.currentTarget.buffered.length - 1 - i
                    ) < e.currentTarget.currentTime
                  ) {
                    setBuffered(
                      (e.currentTarget.buffered.end(
                        e.currentTarget.buffered.length - 1 - i
                      ) *
                        100) /
                        e.currentTarget.duration
                    );
                    console.log(buffered);
                  }
                }
              }
            }}
            onTimeUpdate={(e) => {
              setRemainingDuration(e.currentTarget.currentTime);
              setProgressDuration();
            }}
            onCanPlay={() => {
              setReadyState(true);
              setIsPlaying(true);
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
            buffered={buffered}
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
