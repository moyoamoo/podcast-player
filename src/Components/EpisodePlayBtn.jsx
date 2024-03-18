import { useDispatch } from "react-redux";
import { getEpisode } from "../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";


const EpisodePlayBtn = ({ episodePod }) => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        onClick={() => {
          dispatch(getEpisode(episodePod));
        }}
      >
        <FaPlay />
      </button>
    </>
  );
};

export default EpisodePlayBtn;
