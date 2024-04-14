import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../redux/librarySlice";
import { selectLibrary, addToLibrary } from "../../redux/podcastSlice";
import axios from "axios";
import { add } from "lodash";

const SubscribeBtn = ({ podcast }) => {
  const token = localStorage.getItem("token");
  const [inLibrary, setInLibrary] = useState(false);
  const library = useSelector(selectLibrary);
  const dispatch = useDispatch();

  //api request to add uuid to library, passed in params
  const addPodcast = async (uuid) => {
    try {
      const { data } = await axios.post(
        `http://localhost:6001/library/add`,
        { uuid: uuid },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      console.log(data);
      if (data.status) {
        dispatch(setMessage("Added to Library"));
        dispatch(addToLibrary(uuid));
      } else {
        dispatch(setMessage("Could not add podcast to library"));
      }
    } catch (e) {
      console.log(e);
      dispatch(setMessage("Could not add podcast to library"));
    }
  };

  //if logged in add podast, if not dispatch message
  const addPodcastToLibrary = () => {
    if (token) {
      addPodcast(podcast.uuid);
    } else {
      dispatch(setMessage("Sign in to add podcast to library"));
    }
  };

  //if podcast is in library, set in library to true
  useEffect(() => {
    if (library.includes(podcast.uuid)) {
      setInLibrary(true);
    }
  }, [library]);

  return (
    <>
      {!inLibrary ? (
        <button
          onClick={() => {
            addPodcastToLibrary();
          }}
        >
          Subscribe
        </button>
      ) : (
        <button disabled="disabled">Subscribed</button>
      )}
    </>
  );
};

export default SubscribeBtn;
