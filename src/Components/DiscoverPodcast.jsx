import React from "react";
import "./CSS/stats.scss";

const DiscoverPodcast = ({ podcast }) => {
  return (
    <>
      <img className="discoverPodcast" src={podcast.imageUrl} />
    </>
  );
};

export default DiscoverPodcast;
