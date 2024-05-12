import React, { useCallback } from "react";
import { store } from "../../redux/store";
import defaultImage from "../CSS/assets/podcast-icon.jpg";

import "../CSS/libraryPodcasts.scss";
import { Link } from "react-router-dom";
import { deletefromLibrary } from "../../redux/podcastSlice";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectToken } from "../../redux/librarySlice";

const LibraryPodcast = ({ podcast }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  //delete podcast from library
  const deleteFromLibrary = async (uuid) => {
    try {
      const { data } = await axios.delete(
        "http://localhost:6001/library/delete",
        {
          headers: {
            token,
            uuid,
          },
        }
      );
      if (data.status) {
        dispatch(deletefromLibrary(uuid));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="libraryPodcastContainer">
        <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
          <img
            loading="lazy"
            src={podcast.imageUrl}
            alt={podcast.name}
            onError={(e) => {
              e.target.src = defaultImage;
              e.onError = null;
            }}
          />
        </Link>
        <div className="libraryPodcastHeading">
          <h2>{podcast.name}</h2>

          <button
            className="deleteBtn"
            onClick={() => {
              deleteFromLibrary(podcast.uuid);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default LibraryPodcast;
