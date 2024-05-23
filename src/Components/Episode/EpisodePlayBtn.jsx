import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPause } from "react-icons/fa6";

import {
  getEpisode,
  selectCurrentlyPlaying,
  selectIsLoading,
  selectIsPlaying,
  setEpisodeReadyState,
  setIsClicked,
  setIsPlaying,
} from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import {
  selectQueue,
  setPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import playingGif from "../CSS/assets/playing.gif";

import { useAudioContext } from "../PodcastPlayer/AudioContext";

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
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const audioRef = useAudioContext();

  const [clicked, setClicked] = useState(false);
  const currentPlaying = useSelector(selectCurrentlyPlaying);
  const [lastClick, setLastClick] = useState(Date.now());

  return (
    <>
      <button
        onClick={() => {
          dispatch(getEpisode(episodePod));
          let playPromise = audioRef.current.play();

          if (playPromise !== undefined && lastClick > 5000) {
            playPromise
              .then((_) => {
                audioRef.current.play();
                // dispatch(setIsPlaying(true));
                // dispatch(setEpisodeReadyState(audioRef.current.readyState));
              })
              .catch((e) => {
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
