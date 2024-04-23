import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectRankedGenres } from "../../redux/statsSlice";
import { useSelector } from "react-redux";
import "../CSS/topGenres.scss";

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

  const data = {
    labels,
    datasets: [
      {
        axis: "y",
        label: "Most Listened Genres",
        data: Object.values(rankedGenres),
        borderColor: "#666a86",
        backgroundColor: "#5cd5eb",
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
