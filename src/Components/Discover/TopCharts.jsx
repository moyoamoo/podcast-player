import { useState, useEffect } from "react";
import "../CSS/topCharts.scss";
import TopChartCountry from "./TopChartCountry";
import { useSelector } from "react-redux";
import { selectPodcastsSeries } from "../../redux/podcastSlice";

const TopCharts = () => {
  const [topPodcasts, setTopPodcasts] = useState([]);
  const podcasts = useSelector(selectPodcastsSeries);

  const displayTopPodcast = () => {
    let _topPodcasts = podcasts.filter((podcast) => podcast.topChartsCountry);
    setTopPodcasts(_topPodcasts)
  };

  useEffect(() => {
    displayTopPodcast();
  }, [podcasts]);

  return (
    <>
      <div className="topCharts">
        <h2>Top Charts</h2>
        {topPodcasts.length && topPodcasts.map((podcast) => {
          console.log(podcast)
          return <TopChartCountry podcast={podcast} key={podcast.uuid + "A"} />;
        })}
      </div>
    </>
  );
};

export default TopCharts;
