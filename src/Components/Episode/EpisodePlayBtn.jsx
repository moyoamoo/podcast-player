import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPause } from "react-icons/fa6";

import {
  getEpisode,
  selectCurrentlyPlaying,
  selectEpisodeReadyState,
  selectIsLoading,
  selectIsPlaying,
  selectLastClicked,
  setEpisodeReadyState,
  setIsClicked,
  setLastClicked,
} from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import {
  selectQueue,
  setPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import playingGif from "../CSS/assets/playing.gif";

import { useAudioContext } from "../PodcastPlayer/AudioContext";
import { isPlain } from "@reduxjs/toolkit";
import { set } from "lodash";

// const EpisodePlayBtn = ({ episodePod }) => {
//   const queue = useSelector(selectQueue);
//   const [isLoading, setIsLoading] = useState();
//   const dispatch = useDispatch();
//   const audioRef = useAudioContext();
//   const isPlaying = useSelector(selectIsPlaying);
//   const [clicked, setClicked] = useState(false);
//   const currentlyPlaying = useSelector(selectCurrentlyPlaying);

//   return (
//     <>
//       <button
//         // disabled={isPlaying ? true : false}
//         onClick={() => {
//           dispatch(getEpisode(episodePod));
//           audioRef.current.play();
//           console.log(audioRef.current.paused);
//           // console.log(isPlaying);
//         }}
//       >
//         <FaPlay />
//       </button>
//     </>
//   );
// };

// export default EpisodePlayBtn;

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  // const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const audioRef = useAudioContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [clicked, setClicked] = useState(false);
  const currentPlaying = useSelector(selectCurrentlyPlaying);
  const lastClick = useSelector(selectLastClicked);
  const isLoading = useSelector(selectIsLoading);
  const episodeReadyState = useSelector(selectEpisodeReadyState);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (currentPlaying != episodePod.uuid) {
      setIsPlaying(false);
    } else if (audioRef.current.paused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [queue, audioRef]);

  return (
    <>
      {/* {!isLoading ? (
        <button
          disabled={isPlaying ? true : false}
          onClick={() => {
            dispatch(getEpisode(episodePod));
            dispatch(setIsLoading(true));
            audioRef.current.load();
            let playPromise = audioRef.current.play();
            dispatch(setLastClicked(Date.now()));
            if (
              playPromise !== undefined &&
              isLoading <= 3 &&
              lastClick > 5000
            ) {
              playPromise
                .then((_) => {
                  audioRef.current.play();
                })
                .catch((e) => {
                  console.log(playPromise);
                  console.log(e);
                });
            }
          }}
        >
          {isPlaying ? <img src={playingGif} /> : <FaPlay />}
        </button>
      ) : null} */}
      <button
        onClick={() => {
          dispatch(getEpisode(episodePod));
          if (audioRef.current.readyState !== 4) {
            audioRef.current.load();
          }
          let playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                audioRef.current.play();
              })
              .catch((e) => {
                console.log(playPromise);
                console.log(e);
              });
          }
        }}
      >
        <FaPlay />
      </button>
    </>
  );
};
export default EpisodePlayBtn;
