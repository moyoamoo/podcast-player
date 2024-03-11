import React, { useState, useRef, useEffect } from "react";
import "./CSS/footer.scss";
import { useSelector } from "react-redux";
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

const PodcastPlayer = () => {
  let queue = useSelector(selectQueue);
  const [queueIndex, setQueueIndex] = useState(0);
  const [podDuration, setpodDuration] = useState(1);
  const [remainingDuration, setRemainingDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);
  const [playback, setPlayback] = useState(1);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const audioRef = useRef();
  const podDurationRef = useRef();
  const volumeRef = useRef();

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
    audioRef.current.volume = volumeRef.current.value / 100;
    setCurrentVolume(audioRef.current.volume);
  };

  const changeCurrentTime = () => {
    audioRef.current.currentTime =
      audioRef.current.duration * (podDurationRef.current.value / 100);
  };

  const mutePodcast = () => {
    audioRef.current.volume = !audioRef.current.volume;
    setMuted(audioRef.current.volume);
  };

  useEffect(() => {
    if (queue.length > 0) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, audioRef, queue]);

  return (
    <>
      {queue.length > 0 ? (
        <div className="podcastPlayer">
          <div className="podcastDetails">
            <img
              src={queue[queueIndex].imageUrl}
              alt={queue[queueIndex].podcastName}
            />
            <div>
              <p>{queue[queueIndex].name}</p>
              <p>{queue[queueIndex].podcastName}</p>
            </div>
          </div>

          <audio
            src={queue[queueIndex].audioUrl}
            ref={audioRef}
            onPlay={() => {
              setInterval(() => {
                let seconds = audioRef.current.currentTime;

                setRemainingDuration(seconds);
              }, 1000);
            }}
            onDurationChange={(e) => {
              let seconds = e.currentTarget.duration;
              setpodDuration(seconds);
            }}
            onEnded={() => {
              if (queueIndex < queue.length - 1) {
                queueIndex++;
              } else {
                queueIndex = 0;
              }
            }}
          />
          <div className="playbackControls">
            <button
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
            </button>
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
                togglePlayPause();
              }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
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
                console.log("clicked");
                if (queueIndex < queue.length - 1) {
                  setQueueIndex(queueIndex + 1);
                } else {
                  setQueueIndex(0);
                }
                console.log(queueIndex);
              }}
            >
              <FaForwardStep />
            </button>
          </div>
          <div className="durationControls">
            <span>{remainingDuration}</span>
            <input
              type="range"
              ref={podDurationRef}
              defaultValue="0"
              min="1"
              max="100"
              onChange={() => {
                changeCurrentTime();
              }}
            />
            <span>{podDuration}</span>
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
        <p>No podcast episodes in queue</p>
      )}
    </>
  );
};

export default PodcastPlayer;
