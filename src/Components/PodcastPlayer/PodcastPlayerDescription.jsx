import React from "react";
import defaultImage from "../CSS/assets/podcast-icon.jpg";
const PodcastPlayerDescription = ({ queue, queueIndex }) => {
  return (
    <>
      <div className="podcastDetails">
        <img
          loading="lazy"
          src={queue[queueIndex].imageUrl}
          alt={queue[queueIndex].podcastName}
          onError={(e) => {
            e.target.src = defaultImage;
            e.onError = null;
          }}
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
