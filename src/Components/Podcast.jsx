import React from "react";
import "./css/podcast.scss";
import { store } from "../redux/store";
import { addToLibrary } from "../redux/podcastSlice";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedIn, setMessage } from "../redux/librarySlice";

const Podcast = ({ podcast }) => {
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  const addPodcastToLibrary = () => {
    console.log(podcast.uuid)
    dispatch(addToLibrary(podcast.uuid));

    // if (loggedIn) {
    //   dispatch(addToLibrary(podcast.uuid));
    //   dispatch(setMessage("Added to Library"));
    //   return;
    // } else {
    //   dispatch(setMessage("Sign in to add podcast to library"));
    // }
  };
  return (
    <>
      <div className="podcastContainer">
        <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
          <img
            src={podcast.imageUrl}
            alt={podcast.name}
            onError={(e) => {
              e.target.src = defaultImage;
              e.onerror = null;
            }}
          />
        </Link>

        <div className="podcastHeading">
          <h2>{podcast.name}</h2>
          <button
            onClick={() => {
              addPodcastToLibrary();
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default Podcast;
