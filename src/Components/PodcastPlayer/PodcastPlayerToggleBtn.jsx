import React from "react";

const PodcastPlayerToggleBtn = ({
  className,
  func,
  property,
  iconOne,
  iconTwo,
}) => {
  return (
    <>
      <button className={className} onClick={func}>
        {property ? iconOne : iconTwo}
      </button>
    </>
  );
};

export default PodcastPlayerToggleBtn;
