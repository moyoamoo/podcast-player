import React, { useCallback } from "react";
import { store } from "../../redux/store";
import defaultImage from "../CSS/assets/podcast-icon.jpg";

import "../CSS/libraryPodcasts.scss";
import { Link } from "react-router-dom";
import { deletefromLibrary } from "../../redux/podcastSlice";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import axios from "axios";

const LibraryPodcast = ({ podcast }) => {
  //delete podcast from library
  const deleteFromLibrary = async (uuid) => {
    console.log("i ran")
    try {
      const { data } = await axios.delete(
        "http://localhost:6001/library/delete",
        {
          headers: {
            token: localStorage.getItem("token"),
            uuid: uuid,
          },
        }
      );
      console.log("i ran")
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button
        className="deleteBtn"
        onClick={() => {
          console.log("cl");
          deleteFromLibrary(podcast.uuid);
        }}
      >
        <RxCross2 />
      </button>
      <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
        <div className="libraryPodcastContainer">
          <img
            loading="lazy"
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
