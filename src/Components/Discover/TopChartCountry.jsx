import { Link } from "react-router-dom";
import PodcastImage from "../Search/PodcastImage";

const TopChartCountry = ({ podcast }) => {
  console.log(podcast.uuid)
  return (
    <>
      <div>
        <div className="topChartHeading">
          <h3></h3>
          <div className="topChartImage">
            <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
              <PodcastImage podcast={podcast} />
            </Link>
          </div>
          <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
            <div className="topChartInfo">
              <p>{podcast.position}</p>
              <h3>{podcast.name}</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopChartCountry;
