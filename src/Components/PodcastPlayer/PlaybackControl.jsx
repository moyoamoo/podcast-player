import React from "react";

const PlaybackControl = ({
  className,
  func,
  icon,
}) => {
  return (
    <>
      <button className={className} onClick={func}>
        {icon}
      </button>
    </>
  );
};

export default PlaybackControl;
