import React from "react";
import defaultImage from "../CSS/assets/podcast-icon.jpg";
const PodcastPlayerDescription = ({ queue, queueIndex }) => {
  return (
    <>
      <div className="podcastDetails">
       
        <div>
          <p>{queue[queueIndex].name}</p>
          <p>{queue[queueIndex].podcastName}</p>
        </div>
      </div>
    </>
  );
};

export default PodcastPlayerDescription;
