import React from "react";

const PodcastPlayerDescription = ({queue, queueIndex}) => {
  return (
    <>
      <div className="podcastDetails">
        <img
          src={queue[queueIndex].imageUrl}
          alt={queue[queueIndex].podcastName}
        />
        <div>
          <p>{queue[queueIndex].name}</p>
          <p>{queue[queueIndex].podcastName}</p>
        </div>
      </div>
    </>
  );
};

export default PodcastPlayerDescription;
