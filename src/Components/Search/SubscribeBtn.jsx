import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage,  selectToken} from "../../redux/librarySlice";
import {
  selectLibrary,
  addToLibrary,

} from "../../redux/podcastSlice";
import axios from "axios";
import { url } from "../../config";

const SubscribeBtn = ({ podcast }) => {
  const token = useSelector(selectToken);
  const library = useSelector(selectLibrary);
  const [inLibrary, setInLibrary] = useState(false);
  const dispatch = useDispatch();

  //api request to add uuid to library, passed in params
  const addPodcast = async (uuid) => {
    try {
      const { data } = await axios.post(
        `${url}/library/add`,
        { uuid: uuid },
        {
          headers: { token },
        }
      );
      console.log(data);
      if (data.status) {
        dispatch(setMessage("Added to Library"));
        dispatch(addToLibrary(uuid));
      }
    } catch (e) {
      console.log(e);
      dispatch(setMessage("Duplicate Podcast"));
    }
  };

  //if logged in add podast, if not dispatch message

  //if podcast is in library, set in library to true
  useEffect(() => {
    library.forEach((uuid) => {
      if (podcast.uuid === uuid) {
        setInLibrary(true);
        console.log(inLibrary);
        return;
      }
    });
  }, [library]);

  return (
    <>
      {token && (
        <button
          onClick={() => {
            addPodcast(podcast.uuid);
            console.log(podcast.uuid);
          }}
          disabled={inLibrary && true}
        >
          {inLibrary ? "Subscribed" : "Subscribe"}
        </button>
      )}
    </>
  );
};

export default SubscribeBtn;
