import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../CSS/assets/podcast-icon.jpg"

const DiscoverPodcast = ({ podcast }) => {
  return (
    <>
      <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
        <img loading="lazy" className="discoverPodcast" src={podcast.imageUrl}      
        onError={(e)=>{
          e.target.src = defaultImage;
          e.onerror = null
        }} />
      </Link>
    </>
  );
};

export default DiscoverPodcast;
