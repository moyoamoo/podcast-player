import React, { useState, useRef, useEffect, useCallback } from "react";
import "../CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQueue,
  selectPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import { setListened, setGenres } from "../../redux/statsSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import Controls from "./Controls";
import axios from "axios";
import { debounce } from "lodash";

const PodcastPlayer = () => {
  const queue = useSelector(selectQueue);
  const [buffered, setBuffered] = useState(0);
  const playButton = useSelector(selectPlayButton);
  let [queueIndex, setQueueIndex] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setPodDuration] = useState("00:00:00");
  const [remainingDuration, setRemainingDuration] = useState("00:00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();
  const [lastClick, setLastClick] = useState(Date.now());
  const dispatch = useDispatch();

  //

  const box = useCallback(() => {
    console.log("hello world");
  });

  useEffect(() => {
    if (readyState && playButton && lastClick > 5000) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (readyState) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [playButton, readyState, audioRef]);

  const updateServerDuration = async (playbackDuration, playbackPosition) => {
    const { data } = await axios.post(
      "http://localhost:6001/listened/add",
      {
        playbackPosition,
        playbackDuration,
        // uuid: queue[queueIndex].uuid,
      },
      { headers: { token: 1928752892983 } }
    );
    console.log(data);
  };

  const setProgressDuration = () => {
    if (audioRef.current.currentTime) {
      const progress = Math.round(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
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
                  }
                }
              }
            }}
            onTimeUpdate={(e) => {
              // _.debounce(() => {
              //   console.log("debounce ran")
              // updateServerDuration(
              //   e.currentTarget.duration,
              //   e.currentTarget.currentTime
              // );
              // // }, 3000);

              setRemainingDuration(e.currentTarget.currentTime);
              setProgressDuration();
            }}
            onCanPlay={() => {
              setReadyState(true);
              setIsPlaying(true);
              dispatch(setIsLoading(false));
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
      ) : null}
    </>
  );
};

export default PodcastPlayer;
