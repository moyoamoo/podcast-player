import React from "react";
import "./css/podcast.scss";
import { store } from "../redux/store";
import { addToLibrary } from "../redux/podcastSlice";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn, setMessage } from "../redux/librarySlice";

const Podcast = ({ podcast }) => {
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
              // const loggedIn = useSelector(selectLoggedIn);
              // if (loggedIn) {
              //   store.dispatch(addToLibrary(podcast));
              //   store.dispatch(setMessage("Added to Library"));
              //   return;
              // } else {
              //   store.dispatch(setMessage("Sign in to add podcast to library"));
              // }
              store.dispatch(addToLibrary(podcast));
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
