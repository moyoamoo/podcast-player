import { forwardRef, useState } from "react";
import PodcastPlayerToggleBtn from "./PodcastPlayerToggleBtn";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import PlaybackSpeed from "./PlaybackSpeed";

const BottomPlaybackControls = forwardRef(function BottomPlaybackControls(
  props,
  audioRef
) {
  const [loop, setLoop] = useState(false);
  const [playback, setPlayback] = useState(1);
  const loopPodcast = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setLoop(audioRef.current.loop);
  };
  return (
    <>
      <PodcastPlayerToggleBtn
        className="controlBtn"
        property={loop}
        func={loopPodcast}
        iconOne={<TbRepeatOff />}
        iconTwo={<TbRepeat />}
      />
      <PlaybackSpeed
        playback={playback}
        setPlayback={setPlayback}
        ref={audioRef}
      />
    </>
  );
});

export default BottomPlaybackControls;
