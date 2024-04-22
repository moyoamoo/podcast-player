import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { selectListenData } from "../../redux/statsSlice";
import { useSelector } from "react-redux";

const Listens = ({ queue, queueIndex }) => {
  const listenData = useSelector(selectListenData);
  const [currentPlaying, setCurrentPlaying] = useState(false);

  let data;
  useEffect(() => {
    console.log("i ran")
    if (listenData && queue[queueIndex].uuid === listenData.uuid) {
      setCurrentPlaying(true);
      data = {
        labels: Object.keys(listenData.positionData),
        datasets: [
          {
            data: Object.values(listenData.positionData),
            fill: true,
            backgroundColor: "rgba(189, 195, 199, 0.2)",
            borderColor: "rgba(189, 195, 199, 0.2)",
          },
        ],
      };
    }
  }, []);

  return <>{currentPlaying ? <Line data={data} /> : null}</>;
};

export default Listens;
