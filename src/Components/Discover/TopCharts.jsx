import Podcast from "../Search/Podcast";

const TopCharts = ({ topChartsCountry }) => {
  return (
    <>
      {topChartsCountry.map((podcast) => {
        return <Podcast podcast={podcast} />;
      })}
    </>
  );
};

export default TopCharts;
