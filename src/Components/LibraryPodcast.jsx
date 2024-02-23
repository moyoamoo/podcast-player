import React from "react";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import "./CSS/libraryPodcasts.scss"

const LibraryPodcast = ({ podcast }) => {
  return (
    <div class="libraryPodcastContainer">
      <img
        src={podcast.imageUrl}
        alt={podcast.name}
        onError={(e) => {
          e.target.src = defaultImage;
          e.onError = null;
        }}
      />
<div class="podcastName">
  
        <h2>{podcast.name}</h2>
</div>
    </div>
  );
};

export default LibraryPodcast;
