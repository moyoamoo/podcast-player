import React, { useState, useRef, useEffect } from "react";
import "../CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQueue,
  selectPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import Controls from "./Controls";
import axios from "axios";
import { setListenData } from "../../redux/statsSlice";
import { selectToken } from "../../redux/librarySlice";

const PodcastPlayer = () => {
  const queue = useSelector(selectQueue);
  const playButton = useSelector(selectPlayButton);
  const [buffered, setBuffered] = useState(0);
  let [queueIndex, setQueueIndex] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setPodDuration] = useState("00:00:00");
  const [elapsed, setElapsed] = useState(0);
  const [previousElapsed, setPreviousElpased] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();
  const [genreDuration, setGenreDuration] = useState(0);
  const [lastClick, setLastClick] = useState(Date.now());
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  //add genres to database
  const addGenres = async () => {
    console.log("i ran");
    try {
      const { data } = await axios.post(
        "http://localhost:6001/genres/add",
        { genres: queue[queueIndex].genres },
        {
          headers: {
            token,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (readyState && playButton && lastClick > 5000) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (readyState) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [playButton, readyState, audioRef]);




  useEffect(() => {
    const _elapsed = Math.round(elapsed);
    if (_elapsed === previousElapsed) {
      return;
    }
    updateServerDuration(_elapsed, audioRef.current.duration);
    setPreviousElpased(_elapsed);
  }, [elapsed]);

  const getListenedData = async () => {
    try {
      const { data } = await axios.get("http://localhost:6001/listened/get", {
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
  const updateServerDuration = async (playbackPosition, playbackDuration) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6001/listened/add",
        {
          playbackPosition,
          playbackDuration,
          episodeUuid: queue[queueIndex].uuid,
          podcastUuid: queue[queueIndex].podcastUuid,
        },
        {
          headers: {
            token,
          },
        }
      );
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

              if (Math.round(e.currentTarget.currentTime) === genreDuration) {
                addGenres();
                return;
              }
            }}
            onCanPlay={(e) => {
              console.log(readyState);
              setReadyState(true);
              setIsPlaying(true);
              dispatch(setIsLoading(false));
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
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            podDuration={podDuration}
            progress={progress}
            remainingDuration={elapsed}
            setPodDuration={setPodDuration}
          />
        </div>
      ) : null}
    </>
  );
};

export default PodcastPlayer;
