import React from "react";
import "./css/podcast.scss";
import { store } from "../redux/store";
import { addToLibrary } from "../redux/librarySlice";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import { FaPlus } from "react-icons/fa6";

const Podcast = ({ podcast }) => {
  return (
    <>
      <div className="podcastContainer">
        <img
          src={podcast.imageUrl}
          alt={podcast.name}
          onError={(e) => {
            e.target.src = defaultImage;
            e.onerror = null;
          }}
        />
        <div className="podcastHeading">
          <h2>{podcast.name}</h2>
          <button
            onClick={() => {
              store.dispatch(addToLibrary(podcast));
            }}
          >
            Subscribe <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default Podcast;
