import React, { useState, useRef, useEffect } from "react";
import "./CSS/footer.scss";
import { useSelector } from "react-redux";
import { selectEpisode, selectPodcast } from "../redux/playerSlice";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { format } from "date-fns";
import {
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
  IoVolumeOff,
  IoVolumeMute,
} from "react-icons/io5";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
const PodcastPlayer = () => {
  const episode = useSelector(selectEpisode);
  const podcast = useSelector(selectPodcast);
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
    if (episode) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <>
      {episode && (
        <div className="podcastPlayer">
          <div className="podcastDetails">
            <img src={podcast.imageUrl} alt={podcast.name} />
            <div>
              <p>{podcast.name}</p>
              <p>{episode.name}</p>
            </div>
          </div>

          <audio
            src={episode.audioUrl}
            ref={audioRef}
            onPlay={() => {
              setInterval(() => {
                let seconds = audioRef.current.currentTime;

                setRemainingDuration(seconds);
              }, 1000);
            }}
            onDurationChange={(e) => {
              let seconds = new Date(e.currentTarget.duration);
              setpodDuration(format(seconds, "hh:mm:ss"));
            }}
          />
          <div className="playbackControls">
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
                console.log(loop);
                loopPodcast();
              }}
            >
              {loop ? <TbRepeatOff /> : <TbRepeat />}
            </button>
            <button
              onClick={() => {
                changePlaybackSpeed();
              }}
            >
              {playback}x
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

          <div className="volumeControls">
            <button
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
      )}
    </>
  );
};

export default PodcastPlayer;
