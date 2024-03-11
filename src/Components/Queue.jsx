import React from "react";
import Episode from "./Episode";
import { useSelector } from "react-redux";
import { selectQueue } from "../redux/playerSlice";

const Queue = () => {
  const queue = useSelector(selectQueue);
  return (
    <>
      <h1>My Queue</h1>
      {queue.map((episode) => {
        return <Episode episode={episode} key={episode.uuid} />;
      })}
    </>
  );
};

export default Queue;
