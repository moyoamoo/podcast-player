import React, { useState, useRef, useEffect } from "react";
import "../CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQueue,
  selectPlayButton,
  setIsLoading,
  selectIsPlaying,
  setIsPlaying,
} from "../../redux/playerSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import Controls from "./Controls";
import axios from "axios";
import { setListenData } from "../../redux/statsSlice";
import { selectToken } from "../../redux/librarySlice";
import { url } from "../../config";
import { addGenres } from "../../apiRequests/PodcastPlayer/addGenres";
import { updateServerDuration } from "../../apiRequests/PodcastPlayer/updateServerDuration";
import { useAudioContext } from "./AudioContext";

const PodcastPlayer = () => {
  const audioRef = useAudioContext();
  const queue = useSelector(selectQueue);
  const playButton = useSelector(selectPlayButton);
  const [buffered, setBuffered] = useState(0);
  let [queueIndex, setQueueIndex] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setPodDuration] = useState("00:00:00");
  const [elapsed, setElapsed] = useState(0);
  const [previousElapsed, setPreviousElpased] = useState(0);
  const [progress, setProgress] = useState(0);
  const [genreDuration, setGenreDuration] = useState(0);
  const [lastClick, setLastClick] = useState(Date.now());
  const isPlaying = useSelector(selectIsPlaying);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const resetPlayer = () => {
    audioRef.current.currentTime = 0;
    setPodDuration(0);
    setBuffered(0);
    dispatch(setIsPlaying(false));
  };

  useEffect(() => {
    if (audioRef.current) {
      dispatch(setIsPlaying(false));
    }
  }, [audioRef]);
  // useEffect(() => {
  //   console.log(audioRef)
  //   if (!audioRef.current) {
  //     return;
  //   } else {
  //     resetPlayer();
  //   }

  // }, [queue[queueIndex].audioUrl]);

  // useEffect(() => {
  //   if (readyState && playButton && lastClick > 5000) {
  //     audioRef.current.play();
  //     dispatch(setIsPlaying(true));
  //   } else if (readyState) {
  //     audioRef.current.pause();
  //     dispatch(setIsPlaying(false));
  //   }
  // }, [playButton, readyState, audioRef]);

  useEffect(() => {
    const _elapsed = Math.round(elapsed);
    if (_elapsed === previousElapsed) {
      return;
    }
    updateServerDuration(
      _elapsed,
      audioRef.current.duration,
      queue,
      queueIndex
    );
    setPreviousElpased(_elapsed);
  }, [elapsed]);

  const getListenedData = async () => {
    try {
      const { data } = await axios.get(`${url}/listened/get`, {
        headers: {
          episodeUuid: queue[queueIndex].uuid,
        },
      });
      if (data.data) {
        dispatch(
          setListenData({
            uuid: queue[queueIndex].uuid,
            positionData: data.data,
            duration: audioRef.current.duration,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
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
                  break;
                }
              }
            }}
            onTimeUpdate={(e) => {
              setElapsed(e.currentTarget.currentTime);
              setProgressDuration();

              if (
                Math.round(e.currentTarget.currentTime) === genreDuration &&
                token
              ) {
                addGenres(queue, queueIndex);
                return;
              }
            }}
            onCanPlay={(e) => {
              console.log(readyState);
              setReadyState(true);
              // setIsPlaying(true);
              // dispatch(setIsLoading(false));
              setGenreDuration(Math.round(e.currentTarget.duration * 0.1));
            }}
            onDurationChange={(e) => {
              setPodDuration(e.currentTarget.duration);
            }}
            onEnded={() => {
              if (queueIndex < queue.length - 1) {
                queueIndex++;
              } else {
                queueIndex = 0;
              }
            }}
            onPlay={() => {
              getListenedData();
            }}
          ></audio>
          <Controls
            ref={audioRef}
            queue={queue}
            buffered={buffered}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            readyState={readyState}
            podDuration={podDuration}
            progress={progress}
            remainingDuration={elapsed}
            resetPlayer={resetPlayer}
          />
        </div>
      ) : null}
    </>
  );
};

export default PodcastPlayer;
