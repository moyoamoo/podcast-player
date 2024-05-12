import { Link } from "react-router-dom";
import PodcastImage from "../Search/PodcastImage";

const TopChartCountry = ({ podcast }) => {
  console.log(podcast.name, podcast.uuid);
  return (
    <>
      <div className="topChart">
        <div className="topChartHeading">
          <div className="topChartImage">
            <Link
              to={"/episodes/" + podcast.uuid}
              state={{ podcast }}
              onClick={() => {
                console.log("/episodes/" + podcast.uuid);
              }}
            >
              <PodcastImage podcast={podcast} />
            </Link>
          </div>
          <Link
            to={"/episodes/" + podcast.uuid}
            state={{ podcast }}
            onClick={() => {
              console.log("/episodes/" + podcast.uuid);
            }}
          >
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
