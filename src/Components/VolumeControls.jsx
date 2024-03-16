import { forwardRef, useState } from "react";
import { IoVolumeMute, IoVolumeHigh } from "react-icons/io5";
import PodcastPlayerToggleBtn from "./PodcastPlayerToggleBtn";
import VolumeSlider from "./VolumeSlider";
import PodcastPlayerVolumeIcon from "./PodcastPlayerVolumeIcon";

const VolumeControls = forwardRef(function MyInput(prop, audioRef) {
  const [muted, setMuted] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(0.5);

  const mutePodcast = () => {
    audioRef.current.volume = !audioRef.current.volume;
    setMuted(audioRef.current.volume);
  };
  return (
    <>
      <PodcastPlayerToggleBtn
        className="controlBtn"
        func={mutePodcast}
        property={muted}
        iconOne={<IoVolumeMute />}
        iconTwo={<IoVolumeHigh />}
      />

      <VolumeSlider ref={audioRef} setCurrentVolume={setCurrentVolume} />

      <PodcastPlayerVolumeIcon currentVolume={currentVolume} />
    </>
  );
});

export default VolumeControls;
