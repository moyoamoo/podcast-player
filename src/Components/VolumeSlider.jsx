import { forwardRef, useRef } from "react";

const VolumeSlider = forwardRef(function VolumeSlider(
  { setCurrentVolume },
  audioRef
) {
  const volumeRef = useRef();
  const changeVolume = () => {
    audioRef.current.volume = volumeRef.current.value / 100;
    if (audioRef.current.volume === 0.01) {
      audioRef.current.volume = 0;
    }
    setCurrentVolume(audioRef.current.volume);
  };

  return (
    <>
      <input
        ref={volumeRef}
        type="range"
        min="1"
        max="100"
        onChange={() => {
          changeVolume();
        }}
      />
    </>
  );
});

export default VolumeSlider;
