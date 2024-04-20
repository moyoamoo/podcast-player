import { useDispatch, useSelector } from "react-redux";
import { getEpisode, selectIsLoading } from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import {
  selectQueue,
  setPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  return (
    <>
      {!isLoading && (
        <button
          onClick={() => {
            if (queue.length > 0) {
              if (queue[0].uuid === episodePod.uuid) {
                return;
              }
            }
            dispatch(getEpisode(episodePod));
            dispatch(setPlayButton(true));
            dispatch(setIsLoading(true));
          }}
        >
         { <FaPlay />}
        </button>
      )}
    </>
  );
};

export default EpisodePlayBtn;
