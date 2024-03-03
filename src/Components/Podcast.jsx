import React from "react";
import "./css/podcast.scss";
import { store } from "../redux/store";
import { addToLibrary } from "../redux/podcastSlice";
import defaultImage from "./CSS/assets/podcast-icon.jpg";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const Podcast = ({ podcast }) => {
  const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
  // const [inLibrary, setInLibrary] = useState(false);

  // if (userLibrary) {
  //   let librarySeries = userLibrary.filter((podcast) => {
  //     return podcast.library === true;
  //   });

  //   const checkLibrary = () => {
  //     librarySeries.map((libraryPod) => {
  //       if (libraryPod.uuid === podcast.uuid) {
  //         return setInLibrary(true);
  //       }
  //     });
  //   };

  //   checkLibrary();
  // }

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
