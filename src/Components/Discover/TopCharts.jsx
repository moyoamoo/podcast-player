import Podcast from "../Search/Podcast";
import "../CSS/topCharts.scss"
import TopChartCountry from "./TopChartCountry";

const TopCharts = ({ topChartsCountry}) => {
  return (
    <>
    <div className="topCharts">
        <h2>Top Charts</h2>
    {topChartsCountry.map((podcast) => {
        return <TopChartCountry podcast={podcast} key={podcast.uuid + "A"} />;
      })}
    </div>
 
    </>
  );
};

export default TopCharts;
