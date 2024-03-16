import React from "react";
import {
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
  IoVolumeOff,
} from "react-icons/io5";

const PodcastPlayerVolumeIcon = ({currentVolume}) => {
  return (
    <>
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
    </>
  );
};

export default PodcastPlayerVolumeIcon;
