import { FaPlay } from "react-icons/fa6";
import { getEpisode } from "../redux/playerSlice";
import { useDispatch } from "react-redux";

const QueueBtn = ({ icon, func, text, className}) => {
  const dispatch = useDispatch();
  return (
    <>
      <button className={className}
        onClick={() => {
          dispatch(func);
        }}
      >
        {text} {icon}
      </button>
    </>
  );
};

export default QueueBtn;
