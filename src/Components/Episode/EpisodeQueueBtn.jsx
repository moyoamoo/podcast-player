import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectQueue } from "../../redux/playerSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { addtoQueue, removeFromQueue } from "../../redux/playerSlice";

const EpisodeQueueBtn = ({ episodePod }) => {
  const dispatch = useDispatch();
  const [inQueue, setQueue] = useState(false);
  const queue = useSelector(selectQueue);
  return (
    <>
      <button
        className="queueBtn"
        onClick={() => {
          if (!inQueue) {
            dispatch(addtoQueue(episodePod));
            setQueue(!inQueue);
          } else {
            dispatch(removeFromQueue(episodePod));
            setQueue(!inQueue);
          }
        }}
      >
        Queue {inQueue ? <TiTick /> : <IoIosAddCircleOutline />}
      </button>
    </>
  );
};

export default EpisodeQueueBtn;
