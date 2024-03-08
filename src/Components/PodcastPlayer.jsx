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
} from "react-icons/io5";

const PodcastPlayer = () => {
  const episode = useSelector(selectEpisode);
  const podcast = useSelector(selectPodcast);
  const [podDuration, setpodDuration] = useState(1);
  const [remainingDuration, setRemainingDuration] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const audioRef = useRef();
  const podDurationRef = useRef();
  const volumeRef = useRef();

  const changeVolume = () => {
    audioRef.current.volume = volumeRef.current.value / 100;
  };

  const changeCurrentTime = () => {
    audioRef.current.currentTime =
      audioRef.current.duration * (podDurationRef.current.value / 100);
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
            onPlay={(e) => {
              let seconds = new Date(e.currentTarget.currentTime);
              setRemainingDuration(format(seconds, "mm:ss"));
            }}
            onDurationChange={(e) => {
              let seconds = new Date(e.currentTarget.duration);
              setpodDuration(format(seconds, "hh:mm:ss"));
            }}
          />
          <div className="playbackControls">
            <button
              className="playBtn"
              onClick={() => {
                togglePlayPause();
              }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
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
            <input
              ref={volumeRef}
              type="range"
              min="1"
              max="100"
              onChange={() => {
                changeVolume();
              }}
            />
            {/* <span>
              {(audioRef.current.volume === 0) ? (
                <IoVolumeOff />
              ) : audioRef.current.volume < 0.4 ? (
                <IoVolumeLow />
              ) : audioRef.current.volume <= 0.4 &&
                audioRef.current.volume < 0.7 ? (
                <IoVolumeMedium />
              ) : (
                <IoVolumeHigh />
              )}
            </span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PodcastPlayer;
