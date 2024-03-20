import { useDispatch, useSelector } from "react-redux";
import { getEpisode } from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import { selectQueue } from "../../redux/playerSlice";

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  const dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => {
          if (queue[0].uuid === episodePod.uuid) {
            return;
          }
          dispatch(getEpisode(episodePod));
        }}
      >
        <FaPlay />
      </button>
    </>
  );
};

export default EpisodePlayBtn;
