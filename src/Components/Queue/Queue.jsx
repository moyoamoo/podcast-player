import React from "react";
import Episode from "../Episode/Episode";
import { useSelector } from "react-redux";
import { selectQueue } from "../../redux/playerSlice";
import QueueEpisode from "./QueueEpisode";
import None from "../Library/None";

const Queue = () => {
  const queue = useSelector(selectQueue);
  let counter = 1;
  return (
    <>
   <main>
        <div className="queueHeading">
          <h2>My Queue</h2>
        </div>
        {queue.length > 0 ? (
          queue.map((episode) => {
            return (
              <QueueEpisode episode={episode} key={episode.uuid + counter++} />
            );
          })
        ) : (
          <None text="No Episodes in Queue" />
        )}
   </main>
    </>
  );
};

export default Queue;
