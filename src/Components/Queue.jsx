import React from "react";
import Episode from "./Episode";
import { useSelector } from "react-redux";
import { selectQueue } from "../redux/playerSlice";

const Queue = () => {
  const queue = useSelector(selectQueue);
  return (
    <>
      <h1>My Queue</h1>
      {queue.length > 0 ? (
        queue.map((episode) => {
          return <Episode episode={episode} key={episode.uuid} />;
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
