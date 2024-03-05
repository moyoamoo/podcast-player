import React from "react";
import "./css/podcast.scss";
import { store } from "../redux/store";
import { addToLibrary, getLibraryState, selectLibrary } from "../redux/podcastSlice";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

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
