import React from "react";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import "./CSS/libraryPodcasts.scss";
import { Link } from "react-router-dom";

const LibraryPodcast = ({ podcast }) => {
  console.log(podcast)
  return (
<>
      <div class="libraryPodcastContainer">
        <img
          src={podcast.imageUrl}
          alt={podcast.name}
          onError={(e) => {
            e.target.src = defaultImage;
            e.onError = null;
          }}
        />
  
        <h2>{podcast.name}</h2>
        <Link to="/episodes" state={{podcast}}>Episodes</Link>
      </div>
     
</>
  );
};

export default LibraryPodcast;
