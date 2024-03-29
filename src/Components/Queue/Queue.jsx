import React from "react";
import Episode from "../Episode/Episode";
import { useSelector } from "react-redux";
import { selectQueue } from "../../redux/playerSlice";
import QueueEpisode from "./QueueEpisode";

const Queue = () => {
  const queue = useSelector(selectQueue);
  let counter = 1;
  return (
    <>
      <h1>My Queue</h1>
      {queue.length > 0 ? (
        queue.map((episode) => {
          return (
            <QueueEpisode episode={episode} key={episode.uuid + counter++} />
          );
        })
      ) : (
        <div className="validation">
          <p>No episodes in Queue</p>
        </div>
      )}
    </>
  );
};

export default Queue;
