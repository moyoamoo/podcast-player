import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/librarySlice";
import { selectLibrary, addToLibrary } from "../../redux/podcastSlice";

const SubscribeBtn = ({ podcast }) => {
  const loggedIn = useSelector(selectLoggedIn);
  const [inLibrary, setInLibrary] = useState(false);
  const library = useSelector(selectLibrary);
  const dispatch = useDispatch();

  const addPodcastToLibrary = () => {
    console.log(podcast.uuid);
    console.log(typeof podcast.uuid);
    dispatch(addToLibrary(podcast.uuid));

    // if (loggedIn) {
    //   dispatch(addToLibrary(podcast.uuid));
    //   dispatch(setMessage("Added to Library"));
    //   return;
    // } else {
    //   dispatch(setMessage("Sign in to add podcast to library"));
    // }
  };

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
