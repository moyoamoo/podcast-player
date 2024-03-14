import React from "react";
import "./CSS/stats.scss";
import { Link } from "react-router-dom";

const DiscoverPodcast = ({ podcast }) => {
  return (
    <>
      <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
        <img className="discoverPodcast" src={podcast.imageUrl} />
      </Link>
    </>
  );
};

export default DiscoverPodcast;
