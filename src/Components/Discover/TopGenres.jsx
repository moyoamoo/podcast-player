import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectRankedGenres } from "../../redux/statsSlice";
import { useSelector } from "react-redux";
import "../CSS/topGenres.scss";
import "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopGenres = () => {
  const rankedGenres = useSelector(selectRankedGenres);
  const labels = Object.keys(rankedGenres);

  // const options = {
  //   plugins: {
  //     datalabels: {
  //       display: true,
  //       color: "white",
  //     },
  //   },
  // };

  const data = {
    labels,
    datasets: [
      {
        axis: "y",
        label: "Most Listened Genres",
        data: Object.values(rankedGenres),
        borderColor: "#ddd",
        backgroundColor: "#ddd",
      },
    ],
  };
  return (
    <>
      <h3 className="discoverHeaders">Top Genres</h3>
      <div className="topGenres">
        <Bar data={data} />
      </div>
    </>
  );
};

export default TopGenres;
