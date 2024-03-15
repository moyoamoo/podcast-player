import React, { useState, useRef, useEffect, useCallback } from "react";
import "./CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectQueue } from "../redux/playerSlice";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import {
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
  IoVolumeOff,
  IoVolumeMute,
} from "react-icons/io5";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";

import {
  TbRepeat,
  TbRepeatOff,
  TbRewindForward30,
  TbRewindBackward30,
} from "react-icons/tb";
import { setListened } from "../redux/statsSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import PodcastPlayerPlaybackControl from "./PodcastPlayerPlaybackControl";

const PodcastPlayer = () => {
  const queue = useSelector(selectQueue);
  let [queueIndex, setQueueIndex] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setpodDuration] = useState("00:00:00");
  const [remainingDuration, setRemainingDuration] = useState("00:00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [muted, setMuted] = useState(1);
  const [loop, setLoop] = useState(false);
  const [playback, setPlayback] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();
  const podDurationRef = useRef();
  const volumeRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setReadyState(false);
    setpodDuration("00:00:00");
    setIsPlaying(false);
  }, [queueIndex, queue]);

  const setQueue = () => {
    if (queueIndex > 0) {
      setQueueIndex(queueIndex + 1);
    } else {
      setQueueIndex(0);
    }
  };

  const formatSeconds = (seconds) => {
    if (typeof seconds !== "number" || seconds < 1) {
      return String("00:00:00");
    }

    let secs = seconds;
    const hours = Math.floor(secs / 3600);
    secs %= 3600;
    const minutes = Math.floor(secs / 60);
    const _seconds = Math.floor(secs % 60);

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(_seconds).padStart(2, "0")} `;
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

  const loopPodcast = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setLoop(audioRef.current.loop);
  };

  const changePlaybackSpeed = () => {
    if (playback < 2) {
      Math.round((audioRef.current.playbackRate += 0.1) * 10) / 10;
      setPlayback(Math.round(audioRef.current.playbackRate * 10) / 10);
    } else {
      audioRef.current.playbackRate = 0.5;
      setPlayback(audioRef.current.playbackRate);
    }
  };

  const changeVolume = () => {
    audioRef.current.volume = Math.round(volumeRef.current.value / 100);
    setCurrentVolume(audioRef.current.volume);
  };

  const changeCurrentTime = () => {
    if (audioRef.current.readyState >= 3) {
      audioRef.current.currentTime =
        (audioRef.current.duration * podDurationRef.current.value) / 100;
    }
  };

  const setProgressDuration = () => {
    const progress = Math.round(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
    setProgress(progress);
  };

  const mutePodcast = () => {
    audioRef.current.volume = !audioRef.current.volume;
    setMuted(audioRef.current.volume);
    console.log(muted);
  };

  const togglePlay = () => {
    console.log(readyState);
    if (isPlaying && readyState) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  // useEffect(() => {
  //   if (queue.length > 0) {
  //     isPlaying ? audioRef.current.play() : audioRef.current.pause();
  //     console.log();
  //   }
  // }, [isPlaying, audioRef, queue]);

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
                let seconds = audioRef.current.currentTime;

                if (typeof seconds !== "number") {
                  return setRemainingDuration(0);
                }
                setRemainingDuration(seconds);
                setProgressDuration();
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
     
          <div className="playbackControls">
          <PodcastPlayerPlaybackControl
            className="controlBtn"
            func={setQueue}
            icon={<FaBackwardStep />}
          />
            {/* <button
              className="controlBtn"
              onClick={() => {
                if (queueIndex > 0) {
                  setQueueIndex(queueIndex + 1);
                } else {
                  setQueueIndex(0);
                }
              }}
            >
              <FaBackwardStep />
            </button> */}
            <button
              className="controlBtn"
              onClick={() => {
                skipBackward();
              }}
            >
              <TbRewindBackward30 />
            </button>
            <button
              className="controlBtn"
              onClick={() => {
                togglePlay();
              }}
            >
              {readyState ? isPlaying ? <FaPause /> : <FaPlay /> : null}
            </button>

            <button
              className="controlBtn"
              onClick={() => {
                skipForward();
              }}
            >
              <TbRewindForward30 />
            </button>
            <button
              className="controlBtn"
              onClick={() => {
                if (queueIndex < queue.length - 1) {
                  setQueueIndex(queueIndex + 1);
                } else {
                  setQueueIndex(0);
                }
              }}
            >
              <FaForwardStep />
            </button>
          </div>
          <div className="durationControls">
            <span>{formatSeconds(remainingDuration)}</span>
            <input
              type="range"
              ref={podDurationRef}
              min="0"
              max="100"
              value={progress}
              onChange={() => {
                changeCurrentTime();
              }}
            />
            <span>{formatSeconds(podDuration)}</span>
          </div>
          <div className="bottomControls">
            <div className="bottomPlaybackControls">
              <button
                className="controlBtn"
                onClick={() => {
                  loopPodcast();
                }}
              >
                {loop ? <TbRepeatOff /> : <TbRepeat />}
              </button>
              <button
                className="controlBtn"
                onClick={() => {
                  changePlaybackSpeed();
                }}
              >
                {playback}x
              </button>
            </div>

            <div className="volumeControls">
              <button
                className="controlBtn"
                onClick={() => {
                  mutePodcast();
                }}
              >
                {muted ? <IoVolumeMute /> : <IoVolumeHigh />}
              </button>
              <input
                ref={volumeRef}
                type="range"
                min="1"
                max="100"
                onChange={() => {
                  changeVolume();
                }}
              />

              <span>
                {currentVolume < 0.1 ? (
                  <IoVolumeOff />
                ) : currentVolume < 0.4 ? (
                  <IoVolumeLow />
                ) : currentVolume <= 0.4 && currentVolume > 0.7 ? (
                  <IoVolumeMedium />
                ) : (
                  <IoVolumeHigh />
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PodcastPlayer;
