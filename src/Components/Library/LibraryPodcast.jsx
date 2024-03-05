import React from "react";
import { store } from "../../redux/store";
import defaultImage from "../CSS/assets/podcast-icon.jpg";

import "../CSS/libraryPodcasts.scss";
import { Link } from "react-router-dom";
import { deletefromLibrary } from "../../redux/podcastSlice";
import { RxCross2 } from "react-icons/rx";

const LibraryPodcast = ({ podcast }) => {
 

 return (
    <div>
      <button
        className="deleteBtn"
        onClick={() => {
          store.dispatch(deletefromLibrary(podcast.uuid));
        }}
      >
        <RxCross2 />
      </button>
      <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
        <div className="libraryPodcastContainer">
          <img
            src={podcast.imageUrl}
            alt={podcast.name}
            onError={(e) => {
              e.target.src = defaultImage;
              e.onError = null;
            }}
          />

          <h2>{podcast.name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default LibraryPodcast;
