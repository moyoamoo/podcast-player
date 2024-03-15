import React from "react";

const PodcastPlayerPlaybackControl = ({ className, func, icon }) => {
  return (
    <>
      <button className={className} onClick={func}>
        {icon}
      </button>
    </>
  );
};

export default PodcastPlayerPlaybackControl;
